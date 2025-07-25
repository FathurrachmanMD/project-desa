import { User } from '@/types';
import { usePage } from '@inertiajs/react';

export function useAuth() {
    const { props } = usePage();
    const user = props.auth?.user as User | undefined;
    
    return {
        user,
        isAuthenticated: !!user,
    };
}
