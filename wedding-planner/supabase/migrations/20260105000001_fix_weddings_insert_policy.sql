-- Fix RLS policy for inserting weddings
-- The INSERT policy needs to allow authenticated users to create weddings

-- 1. Drop existing INSERT policy if it exists (might be broken or missing)
DROP POLICY IF EXISTS "Users can create weddings" ON weddings;

-- 2. Re-create the INSERT policy
-- Allow authenticated users to insert weddings where they are the creator
CREATE POLICY "Users can create weddings" ON weddings
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = created_by);

-- 3. Also ensure there's a policy for wedding_members INSERT
-- When a wedding is created, we need to add the creator as an owner
DROP POLICY IF EXISTS "Users can insert wedding members" ON wedding_members;

CREATE POLICY "Users can insert wedding members" ON wedding_members
FOR INSERT
WITH CHECK (
    auth.uid() IS NOT NULL AND (
        -- Allow users to add themselves as owner to weddings they created
        (user_id = auth.uid() AND role = 'owner') OR
        -- Allow existing owners/co-owners/planners to invite others
        EXISTS (
            SELECT 1 FROM wedding_members wm
            WHERE wm.wedding_id = wedding_members.wedding_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'co_owner', 'planner')
        )
    )
);

-- 4. Also add UPDATE policy for wedding_members
DROP POLICY IF EXISTS "Members can update wedding members" ON wedding_members;

CREATE POLICY "Members can update wedding members" ON wedding_members
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM wedding_members wm
        WHERE wm.wedding_id = wedding_members.wedding_id
        AND wm.user_id = auth.uid()
        AND wm.role IN ('owner', 'co_owner', 'planner')
    )
);

-- 5. Add DELETE policy for wedding_members
DROP POLICY IF EXISTS "Members can delete wedding members" ON wedding_members;

CREATE POLICY "Members can delete wedding members" ON wedding_members
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM wedding_members wm
        WHERE wm.wedding_id = wedding_members.wedding_id
        AND wm.user_id = auth.uid()
        AND wm.role IN ('owner', 'co_owner')
    )
);

SELECT 'Wedding INSERT RLS policies fixed!' as status;
