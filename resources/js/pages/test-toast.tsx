import * as React from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useAppToast } from '@/hooks/useToast';

export default function TestToast() {
    const toast = useAppToast();

    const testSuccess = () => {
        console.log('Testing success toast...');
        toast.success('Test Success!', 'Ini adalah test toast success');
    };

    const testError = () => {
        console.log('Testing error toast...');
        toast.error('Test Error!', 'Ini adalah test toast error');
    };

    const testAuthLogin = () => {
        console.log('Testing auth login toast...');
        toast.auth.loginSuccess();
    };

    const testCrudUpdate = () => {
        console.log('Testing crud update toast...');
        toast.crud.updateSuccess('Test Data');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Head title="Test Toast" />
            
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
                <h1 className="text-2xl font-bold mb-6">Test Toast Notifications</h1>
                
                <div className="space-y-4">
                    <Button onClick={testSuccess} className="w-full">
                        Test Success Toast
                    </Button>
                    
                    <Button onClick={testError} variant="destructive" className="w-full">
                        Test Error Toast
                    </Button>
                    
                    <Button onClick={testAuthLogin} variant="secondary" className="w-full">
                        Test Auth Login Toast
                    </Button>
                    
                    <Button onClick={testCrudUpdate} variant="outline" className="w-full">
                        Test CRUD Update Toast
                    </Button>
                </div>
            </div>
        </div>
    );
}
