"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import {
  Search,
  Edit2,
  Trash2,
  User,
  X,
  Check,
  AlertCircle,
  ChevronDown,
  Filter,
  Shield,
  ShieldCheck,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  UserCheck,
  UserX,
  Users,
  Crown,
  MoreVertical,
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: "user" | "vendor" | "admin";
  is_active: boolean;
  wedding_date: string | null;
  partner_name: string | null;
  city: string | null;
  created_at: string;
  last_sign_in_at: string | null;
}

const roleColors = {
  user: "bg-blue-100 text-blue-700",
  vendor: "bg-purple-100 text-purple-700",
  admin: "bg-amber-100 text-amber-700",
};

const roleIcons = {
  user: User,
  vendor: Building,
  admin: Crown,
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "user" | "vendor" | "admin">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    setSaving(true);
    setError(null);

    try {
      const { error } = await (supabase
        .from("profiles") as any)
        .update({
          full_name: editingUser.full_name,
          phone: editingUser.phone,
          role: editingUser.role,
          is_active: editingUser.is_active,
          city: editingUser.city,
        })
        .eq("id", editingUser.id);

      if (error) throw error;
      setSuccess("User updated successfully");
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (user: UserProfile) => {
    try {
      const { error } = await (supabase
        .from("profiles") as any)
        .update({ is_active: !user.is_active })
        .eq("id", user.id);

      if (error) throw error;
      setSuccess(`User ${user.is_active ? "deactivated" : "activated"} successfully`);
      fetchUsers();
    } catch (err) {
      setError("Failed to update user status");
    }
    setActionMenu(null);
  };

  const handleChangeRole = async (user: UserProfile, newRole: "user" | "vendor" | "admin") => {
    try {
      const { error } = await (supabase
        .from("profiles") as any)
        .update({ role: newRole })
        .eq("id", user.id);

      if (error) throw error;
      setSuccess(`User role changed to ${newRole}`);
      fetchUsers();
    } catch (err) {
      setError("Failed to change user role");
    }
    setActionMenu(null);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const { error } = await supabase.from("profiles").delete().eq("id", id);

      if (error) throw error;
      setSuccess("User deleted successfully");
      setDeleteConfirm(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.is_active) ||
      (filterStatus === "inactive" && !user.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.is_active).length,
    vendors: users.filter((u) => u.role === "vendor").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 p-6">
      {/* Notifications */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl shadow-lg"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
            <button onClick={() => setError(null)} className="ml-2">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg"
          >
            <Check className="w-5 h-5" />
            {success}
            <button onClick={() => setSuccess(null)} className="ml-2">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-stone-800 mb-2">User Management</h1>
        <p className="text-stone-600">Manage all users, vendors, and administrators</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-800">{stats.total}</p>
              <p className="text-sm text-stone-500">Total Users</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-800">{stats.active}</p>
              <p className="text-sm text-stone-500">Active Users</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
              <Building className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-800">{stats.vendors}</p>
              <p className="text-sm text-stone-500">Vendors</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-800">{stats.admins}</p>
              <p className="text-sm text-stone-500">Admins</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        {/* Role Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleDropdown(!showRoleDropdown);
              setShowFilterDropdown(false);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
          >
            <Shield className="w-5 h-5 text-stone-500" />
            <span className="capitalize">{filterRole}</span>
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </button>
          {showRoleDropdown && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-stone-200 rounded-xl shadow-lg z-10 min-w-[140px]">
              {["all", "user", "vendor", "admin"].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setFilterRole(role as any);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-stone-50 first:rounded-t-xl last:rounded-b-xl capitalize ${
                    filterRole === role ? "bg-amber-50 text-amber-700" : "text-stone-700"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFilterDropdown(!showFilterDropdown);
              setShowRoleDropdown(false);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
          >
            <Filter className="w-5 h-5 text-stone-500" />
            <span className="capitalize">{filterStatus}</span>
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </button>
          {showFilterDropdown && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-stone-200 rounded-xl shadow-lg z-10 min-w-[140px]">
              {["all", "active", "inactive"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status as any);
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-stone-50 first:rounded-t-xl last:rounded-b-xl capitalize ${
                    filterStatus === status ? "bg-amber-50 text-amber-700" : "text-stone-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-stone-100 last:border-0 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-stone-200" />
                <div className="flex-1">
                  <div className="h-4 bg-stone-200 rounded w-1/4 mb-2" />
                  <div className="h-3 bg-stone-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-stone-600 mb-2">No users found</h3>
            <p className="text-stone-500">
              {searchTerm ? "Try adjusting your search" : "No users match your filters"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-stone-600">User</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Contact</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Joined</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-stone-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((user, index) => {
                    const RoleIcon = roleIcons[user.role] || User;
                    return (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors"
                      >
                        {/* User Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-medium">
                              {user.full_name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-stone-800">
                                {user.full_name || "No name"}
                              </p>
                              <p className="text-sm text-stone-500">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {user.phone && (
                              <p className="flex items-center gap-1.5 text-stone-600">
                                <Phone className="w-3.5 h-3.5" />
                                {user.phone}
                              </p>
                            )}
                            {user.city && (
                              <p className="flex items-center gap-1.5 text-stone-500">
                                <MapPin className="w-3.5 h-3.5" />
                                {user.city}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              roleColors[user.role]
                            }`}
                          >
                            <RoleIcon className="w-3.5 h-3.5" />
                            {user.role}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.is_active ? (
                              <>
                                <UserCheck className="w-3.5 h-3.5" /> Active
                              </>
                            ) : (
                              <>
                                <UserX className="w-3.5 h-3.5" /> Inactive
                              </>
                            )}
                          </span>
                        </td>

                        {/* Joined */}
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-stone-600">{formatDate(user.created_at)}</p>
                            {user.last_sign_in_at && (
                              <p className="text-stone-400 text-xs">
                                Last login: {formatDate(user.last_sign_in_at)}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 relative">
                            <button
                              onClick={() => setEditingUser(user)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <div className="relative">
                              <button
                                onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {actionMenu === user.id && (
                                <div className="absolute right-0 top-full mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-20 min-w-[180px] py-1">
                                  <button
                                    onClick={() => handleToggleActive(user)}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-stone-50 flex items-center gap-2"
                                  >
                                    {user.is_active ? (
                                      <>
                                        <UserX className="w-4 h-4 text-red-500" />
                                        Deactivate User
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="w-4 h-4 text-green-500" />
                                        Activate User
                                      </>
                                    )}
                                  </button>

                                  <div className="border-t border-stone-100 my-1" />

                                  <div className="px-4 py-1.5 text-xs text-stone-400 uppercase tracking-wide">
                                    Change Role
                                  </div>
                                  {(["user", "vendor", "admin"] as const).map((role) => (
                                    <button
                                      key={role}
                                      onClick={() => handleChangeRole(user, role)}
                                      disabled={user.role === role}
                                      className={`w-full px-4 py-2 text-left text-sm hover:bg-stone-50 flex items-center gap-2 capitalize ${
                                        user.role === role ? "text-stone-400" : "text-stone-700"
                                      }`}
                                    >
                                      {role === "admin" && <Crown className="w-4 h-4" />}
                                      {role === "vendor" && <Building className="w-4 h-4" />}
                                      {role === "user" && <User className="w-4 h-4" />}
                                      {role}
                                      {user.role === role && " (current)"}
                                    </button>
                                  ))}

                                  <div className="border-t border-stone-100 my-1" />

                                  <button
                                    onClick={() => {
                                      setDeleteConfirm(user.id);
                                      setActionMenu(null);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete User
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditingUser(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
                <h2 className="text-xl font-serif text-stone-800">Edit User</h2>
                <button
                  onClick={() => setEditingUser(null)}
                  className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Email (readonly) */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    disabled
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl bg-stone-50 text-stone-500"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={editingUser.full_name || ""}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, full_name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={editingUser.phone || ""}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">City</label>
                  <input
                    type="text"
                    value={editingUser.city || ""}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, city: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    placeholder="Enter city"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        role: e.target.value as "user" | "vendor" | "admin",
                      })
                    }
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Active Status */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingUser.is_active}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, is_active: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-stone-700">Account is active</span>
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-200 bg-stone-50 rounded-b-2xl">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-5 py-2.5 text-stone-600 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-stone-800">Delete User?</h3>
                  <p className="text-stone-500 text-sm">
                    This will permanently delete the user account and all associated data.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(deleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  Delete User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close action menu */}
      {actionMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setActionMenu(null)}
        />
      )}
    </div>
  );
}
