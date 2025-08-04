<?php

namespace Database\Factories;

use App\Models\LapakUser;
use App\Models\Surat;
use App\Models\Penduduk;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LapakUser>
 */
class LapakUserFactory extends Factory
{
    protected $model = LapakUser::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $namaUsaha = $this->faker->randomElement([
            'Warung Bu ' . $this->faker->firstName('female'),
            'Toko ' . $this->faker->company(),
            'Warung Makan ' . $this->faker->city(),
            'Bengkel ' . $this->faker->lastName(),
            'Salon ' . $this->faker->firstName('female'),
            'Fotocopy ' . $this->faker->streetName(),
            'Laundry ' . $this->faker->colorName(),
            'Kedai Kopi ' . $this->faker->word(),
        ]);

        return [
            'nama_usaha' => $namaUsaha,
            'slug' => \Str::slug($namaUsaha),
            'jenis_usaha' => $this->faker->randomElement([
                'Warung Makan',
                'Toko Kelontong',
                'Bengkel Motor',
                'Salon Kecantikan',
                'Fotocopy & Print',
                'Laundry',
                'Kedai Kopi',
                'Toko Sembako',
                'Warung Nasi',
                'Jahit Pakaian'
            ]),
            'alamat_usaha' => 'Desa Drawati, RT ' . $this->faker->numberBetween(1, 15) . '/RW ' . $this->faker->numberBetween(1, 8) . ', ' . $this->faker->streetAddress(),
            'pemilik_nama' => $this->faker->name(),
            'pemilik_nik' => $this->faker->numerify('35##############'),
            'telepon' => $this->faker->phoneNumber(),
            'email' => $this->faker->optional(0.7)->safeEmail(),
            'status' => $this->faker->boolean(90), // 90% active
            'tanggal_disetujui' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'surat_id' => null, // Will be set manually if needed
            'penduduk_id' => null, // Will be set manually if needed
            'created_by' => 1, // Default admin user
            'updated_by' => 1,
        ];
    }

    /**
     * Indicate that the lapak user is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => true,
        ]);
    }

    /**
     * Indicate that the lapak user is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => false,
        ]);
    }

    /**
     * Associate with a specific surat.
     */
    public function withSurat(Surat $surat): static
    {
        return $this->state(fn (array $attributes) => [
            'surat_id' => $surat->id,
            'nama_usaha' => $surat->form['nama_usaha'] ?? $attributes['nama_usaha'],
            'jenis_usaha' => $surat->form['jenis_usaha'] ?? $attributes['jenis_usaha'],
            'alamat_usaha' => $surat->form['alamat_usaha'] ?? $attributes['alamat_usaha'],
            'pemilik_nama' => $surat->form['nama_pemohon'] ?? $attributes['pemilik_nama'],
            'pemilik_nik' => $surat->form['nik'] ?? $attributes['pemilik_nik'],
            'tanggal_disetujui' => $surat->updated_at,
        ]);
    }

    /**
     * Associate with a specific penduduk.
     */
    public function withPenduduk(Penduduk $penduduk): static
    {
        return $this->state(fn (array $attributes) => [
            'penduduk_id' => $penduduk->id,
            'pemilik_nama' => $penduduk->nama,
            'pemilik_nik' => $penduduk->nik,
        ]);
    }
}
