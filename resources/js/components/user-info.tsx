import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ 
    user, 
    showEmail = false, 
    variant = 'navbar' 
}: { 
    user: User; 
    showEmail?: boolean;
    variant?: 'navbar' | 'dropdown';
}) {
    const getInitials = useInitials();

    const nameColor = variant === 'navbar' ? 'text-white' : 'text-gray-900';
    const emailColor = variant === 'navbar' ? 'text-gray-300' : 'text-gray-600';

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-gray-600 text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className={`truncate font-medium ${nameColor}`}>{user.name}</span>
                {showEmail && <span className={`truncate text-xs ${emailColor}`}>{user.email}</span>}
            </div>
        </>
    );
}
