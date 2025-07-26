import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '@inertiajs/react';

export default function NewButton ({href}: {href: string}) {
    return (
        <Link href={href}>
            <Button
            className="cursor-pointer flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-md shadow hover:bg-primary/90"
            type='button'
            >
                <Plus className="w-10 h-10" />
                Tambah Perizinan
            </Button>
        </Link>
    )
}
