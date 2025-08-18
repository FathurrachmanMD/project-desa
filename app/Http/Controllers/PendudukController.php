<?php

namespace App\Http\Controllers;

use App\Models\Penduduk;
use App\Models\Surat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

class PendudukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Ambil semua data penduduk
        $penduduk = Penduduk::all();
        $slug = 'penduduk';

        // Hitung jumlah total dan berdasarkan status
        $total      = $penduduk->count();
        $aktif      = $penduduk->where('status', 'aktif')->count();
        $nonaktif   = $penduduk->where('status', 'nonaktif')->count();
        $suspended  = $penduduk->where('status', 'suspended')->count();

        // Return sesuai format yang kamu mau
        return Inertia::render('admin/customer/index', [
            'slug' => $slug,
            'data' => [
                $slug => $penduduk
            ],
            'total' => [
                $slug => $total
            ],
            'aktif' => [
                $slug => $aktif
            ],
            'nonaktif' => [
                $slug => $nonaktif
            ],
            'suspended' => [
                $slug => $suspended
            ],
        ]);
    }


    public function createFromSurat(Surat $surat) {
        // create or find penduduk by where surat.form.nik match
        $penduduk = Penduduk::create([
            'nama' => $surat->form->nama,
            'nik' => $surat->form->nik,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id()
        ]);

        $surat->penduduk_id = $penduduk->id;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // The validation logic is great. If it fails, Laravel will
        // automatically redirect back with errors. No need for a try-catch.
        $validated = $request->validate([
            'nama'            => 'required|string|max:255',
            'nik'             => 'required|string|max:255|unique:penduduk,nik',
            'sex'             => 'required|in:L,P',
            'pekerjaan'       => 'nullable|string|max:255',
            'tempatlahir'     => 'nullable|string|max:255',
            'tanggallahir'    => 'nullable|date',
            'status'          => 'required|in:aktif,nonaktif,suspended',
            'alamat_sekarang' => 'nullable|string',
            'email'           => 'nullable|email|max:255',
            'telepon'         => 'nullable|string|max:255',
        ]);

        $validated['created_by'] = Auth::id();
        $validated['updated_by'] = Auth::id();

        Penduduk::create($validated);

        // Instead of JSON, return a redirect to the customers list.
        // Flash a success message to the session, which Inertia will pick up.
        return Redirect::route('customers.index')->with('success', 'Penduduk baru berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $req, $id = null)
    {
        $pendudukData = null;
        
        // --- EDIT MODE ---
        // If an ID is provided, fetch the existing data.
        if ($id) {
            // Eager load the 'penduduk' relationship to prevent extra database queries.
            $penduduk = Penduduk::findOrFail($id);

            // Prepare a simple, flat array of data for the 'lapak' prop.
            // The keys here MUST match the keys in the `inputs` config of the React component.
            $pendudukData = [
                'nama'            => $penduduk->nama,
                'nik'             => $penduduk->nik,
                'sex'             => $penduduk->sex,
                'pekerjaan'       => $penduduk->pekerjaan,
                'tempatlahir'     => $penduduk->tempatlahir,
                'tanggallahir'    => $penduduk->tanggallahir?->format('Y-m-d'), // format date for input
                'status'          => $penduduk->status,
                'alamat_sekarang' => $penduduk->alamat_sekarang,
                'email'           => $penduduk->email,
                'telepon'         => $penduduk->telepon,
            ];
        }

        // --- RENDER INERTIA VIEW ---
        // The component path 'Lapak/Form' should map to 'resources/js/Pages/Lapak/Form.tsx'.
        return Inertia::render('admin/customer/form', [
            'id' => $id,
            /**
             * Pass the flattened $lapakData object.
             * If we are in create mode, this will be null, and the React
             * component will initialize its own default empty state.
             */
            'penduduk' => $pendudukData,
            'slug' => 'penduduk', // Example slug, can be made dynamic if needed.
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penduduk $penduduk)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Manually find the model by its ID.
        // findOrFail will automatically throw a 404 error if the ID is not found.
        $customer = Penduduk::findOrFail($id);

        $validated = $request->validate([
            'nama'            => 'required|string|max:255',
            // Update the unique rule to ignore the current model's ID.
            'nik'             => ['required', 'string', 'max:255'],
            'sex'             => 'required|in:L,P',
            'pekerjaan'       => 'nullable|string|max:255',
            'tempatlahir'     => 'nullable|string|max:255',
            'tanggallahir'    => 'nullable|date',
            'status'          => 'required|in:aktif,nonaktif,suspended',
            'alamat_sekarang' => 'nullable|string',
            'email'           => 'nullable|email|max:255',
            'telepon'         => 'nullable|string|max:255',
        ]);

        $validated['updated_by'] = Auth::id();

        // The model has been found, so now we can update it.
        $customer->update($validated);

        // Redirect back to the index page with a success message.
        return Redirect::route('customers.index')->with('success', 'Data penduduk berhasil diperbarui!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $slug = 'penduduk';

        try {
            $penduduk = Penduduk::findOrFail($id);
            $penduduk->delete();

            return redirect()->route('customers.index', $slug)
                ->with('success', 'Data penduduk berhasil dihapus');
        } catch (ModelNotFoundException $e) {
            return redirect()->route('customers.index', $slug)
                ->with('error', 'Data penduduk tidak ditemukan');
        } catch (\Exception $e) {
            return redirect()->route('customers.index', $slug)
                ->with('error', 'Gagal menghapus data penduduk: ' . $e->getMessage());
        }
    }
}
