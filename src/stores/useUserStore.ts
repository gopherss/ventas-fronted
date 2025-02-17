import { create } from 'zustand';
import { UserModel } from "../models";

interface UserState {
    users: UserModel[];
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setUsers: (users: UserModel[]) => void;
    addUser: (user: UserModel) => void;
    updateUser: (userId: number, updatedUser: UserModel) => void;
}

export const useUserStore = create<UserState>((set) => ({
    users: [],
    loading: false,
    error: null,

    setLoading: (loading) => set(() => ({ loading })),
    setError: (error) => set(() => ({ error })),
    setUsers: (users) => set(() => ({ users })),

    addUser: (user) => set((state) => ({ users: [...state.users, user] })),

    updateUser: (userId, updatedUser) =>
        set((state) => ({
            users: state.users.map((user) =>
                user.id_usuario === userId ? updatedUser : user
            ),
        })),
}));