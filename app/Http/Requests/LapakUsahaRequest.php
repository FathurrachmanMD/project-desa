<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProdukRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Izinkan semua orang untuk mengirim form ini
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Nama field disesuaikan dengan yang dikirim dari frontend (React)
        return [
            'title'       => ['required', 'string', 'max:100'],
            'price'       => ['required', 'string', 'max:50'],
            'category'    => ['required', 'string', 'exists:kategori-produk,nama'], // Memastikan kategori ada di tabel
            'description' => ['required', 'string'],
            'sellerName'  => ['required', 'string', 'max:100'],
            'sellerPhone' => ['required', 'string', 'max:100'],
            'imgSrc'      => ['required', 'string', 'url'], // Memastikan ini adalah URL yang valid
        ];
    }
}