import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud } from 'lucide-react';
import clsx from 'clsx';

interface FileUploadProps {
    label: string;
    hint?: string;
    accept?: string;
    maxSize?: number;
    required?: boolean;
}

export function FileUpload({ 
    label, 
    hint,
    accept = '*',
    maxSize = 2 * 1024 * 1024, // 2MB default
    required = false 
}: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setError('');

        if (selectedFile) {
            if (selectedFile.size > maxSize) {
                setError('File terlalu besar');
                setFile(null);
                return;
            }

            setFile(selectedFile);
        }
    };

    return (
        <div className="space-y-2">
            <Label>{label}{required && <span className="text-red-500 ml-1">*</span>}</Label>
            <div className="relative">
                <Input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                    id={`file-${label}`}
                    required={required}
                />
                <label
                    htmlFor={`file-${label}`}
                    className={clsx(
                        'flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer',
                        'hover:bg-gray-50 transition-colors',
                        file ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300',
                        error && 'border-red-500 bg-red-50/50'
                    )}
                >
                    <div className="space-y-2 text-center">
                        <div className="flex justify-center">
                            <UploadCloud 
                                className={clsx(
                                    'w-8 h-8',
                                    file ? 'text-blue-500' : 'text-gray-400',
                                    error && 'text-red-500'
                                )}
                            />
                        </div>
                        <div className="flex flex-col text-sm">
                            {file ? (
                                <span className="font-medium text-blue-600">{file.name}</span>
                            ) : (
                                <>
                                    <span className="font-medium text-blue-600">Klik untuk upload</span>
                                    {hint && <span className="text-gray-500">{hint}</span>}
                                </>
                            )}
                        </div>
                    </div>
                </label>
            </div>
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
