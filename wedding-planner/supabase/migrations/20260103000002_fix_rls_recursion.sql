-- Fix for infinite recursion in wedding_members RLS policy
-- We replace the recursive subquery with a SECURITY DEFINER function.

-- 1. Create a helper function to check membership safely (bypassing RLS)
CREATE OR REPLACE FUNCTION public.is_wedding_member(p_wedding_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM wedding_members
    WHERE wedding_id = p_wedding_id
    AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop the recursive policy
DROP POLICY IF EXISTS "Members can view wedding members" ON wedding_members;

-- 3. Create the new non-recursive policy
CREATE POLICY "Members can view wedding members" ON wedding_members FOR SELECT USING (
    is_wedding_member(wedding_id)
);

-- 4. Apply the same safe check to guests and weddings for consistency/performance
DROP POLICY IF EXISTS "Members can view guests" ON guests;
CREATE POLICY "Members can view guests" ON guests FOR SELECT USING (
    is_wedding_member(wedding_id)
);

DROP POLICY IF EXISTS "Members can view weddings" ON weddings;
CREATE POLICY "Members can view weddings" ON weddings FOR SELECT USING (
    is_wedding_member(id)
);
