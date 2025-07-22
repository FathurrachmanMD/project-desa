import{j as a,r as h,L as ga}from"./app-pz90tg18.js";import{C as v,B as ea,X as ua,A as xa}from"./app-layout-BAcGBlnB.js";import{C as T,a as C,b as z,d as M,c as pa}from"./card-DLa0gNda.js";import{D as u,S as A,a as W,b as R,P as ha,c as $,d as K,e as F,f as I,g as j,h as ja,i as ka,s as fa,B as X,L as ya,T as Na,j as va,k as ba,l as _a,m as wa}from"./delete-confirmation-modal-B0iUyj41.js";import{D as sa,a as na,b as ta,c as ia,d as la}from"./dialog-aSj6E5mW.js";import{c as Da,B}from"./button-BivgBfVy.js";import{L as r,I as f}from"./label-D0mw7rwx.js";import{U as J}from"./user-lvQ4F-1T.js";import{M as O}from"./map-pin-fyOtIFHW.js";import{C as Y}from"./clock-BHHr_Jqx.js";import{S as Q}from"./shield-CLpy0uGb.js";import{S as aa}from"./save-Bkh3Ep3W.js";import"./index-CwzIttZf.js";import"./app-logo-icon-B1PDI8Gt.js";import"./eye-CfeHRaM_.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pa=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],Aa=Da("Users",Pa),Sa=({onView:s,onEdit:d,onDelete:o}={})=>[{accessorKey:"nama_pemohon",header:({column:e})=>a.jsx(u,{column:e,title:"Nama Pemohon"}),cell:({row:e})=>a.jsx("div",{className:"font-medium",children:e.getValue("nama_pemohon")})},{accessorKey:"jenis_acara",header:({column:e})=>a.jsx(u,{column:e,title:"Jenis Acara"}),cell:({row:e})=>a.jsx("div",{className:"max-w-[150px] truncate font-medium",children:e.getValue("jenis_acara")})},{accessorKey:"tanggal_acara",header:({column:e})=>a.jsx(u,{column:e,title:"Tanggal Acara"}),cell:({row:e})=>a.jsx("div",{className:"text-sm",children:new Date(e.getValue("tanggal_acara")).toLocaleDateString("id-ID",{year:"numeric",month:"short",day:"numeric"})})},{accessorKey:"lokasi_acara",header:({column:e})=>a.jsx(u,{column:e,title:"Lokasi Acara"}),cell:({row:e})=>a.jsx("div",{className:"max-w-[200px] truncate text-sm",children:e.getValue("lokasi_acara")})},{accessorKey:"dampak_keramaian",header:({column:e})=>a.jsx(u,{column:e,title:"Dampak Keramaian"}),cell:({row:e})=>{const c=e.getValue("dampak_keramaian");return a.jsx("div",{className:`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c==="Ya"?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-800"}`,children:c})}},{accessorKey:"status",header:({column:e})=>a.jsx(u,{column:e,title:"Status Pengajuan"}),cell:({row:e})=>a.jsx(A,{status:e.getValue("status"),type:"event"}),filterFn:(e,c,p)=>p.includes(e.getValue(c))},{id:"actions",header:({column:e})=>a.jsx(u,{column:e,title:"Aksi"}),cell:({row:e})=>a.jsx(W,{row:e,onView:s,onEdit:d,onDelete:o})}],Ta=({onView:s,onEdit:d,onDelete:o}={})=>[{accessorKey:"nama_penyelenggara",header:({column:e})=>a.jsx(u,{column:e,title:"Nama Penyelenggara"}),cell:({row:e})=>a.jsx("div",{className:"font-medium",children:e.getValue("nama_penyelenggara")})},{accessorKey:"nama_acara",header:({column:e})=>a.jsx(u,{column:e,title:"Nama Acara"}),cell:({row:e})=>a.jsx("div",{className:"max-w-[180px] truncate font-medium",children:e.getValue("nama_acara")})},{accessorKey:"tanggal_waktu_acara",header:({column:e})=>a.jsx(u,{column:e,title:"Tanggal & Waktu Acara"}),cell:({row:e})=>a.jsx("div",{className:"text-sm whitespace-nowrap",children:e.getValue("tanggal_waktu_acara")})},{accessorKey:"lokasi_acara",header:({column:e})=>a.jsx(u,{column:e,title:"Lokasi Acara"}),cell:({row:e})=>a.jsx("div",{className:"max-w-[200px] truncate text-sm",children:e.getValue("lokasi_acara")})},{accessorKey:"rekomendasi_keamanan",header:({column:e})=>a.jsx(u,{column:e,title:"Rekomendasi Keamanan"}),cell:({row:e})=>{const c=e.getValue("rekomendasi_keamanan");return a.jsx("div",{className:`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c==="Sudah"?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:c})}},{accessorKey:"status",header:({column:e})=>a.jsx(u,{column:e,title:"Status Pengajuan"}),cell:({row:e})=>a.jsx(A,{status:e.getValue("status"),type:"event"}),filterFn:(e,c,p)=>p.includes(e.getValue(c))},{id:"actions",header:({column:e})=>a.jsx(u,{column:e,title:"Aksi"}),cell:({row:e})=>a.jsx(W,{row:e,onView:s,onEdit:d,onDelete:o})}],Ca=({onView:s,onEdit:d,onDelete:o}={})=>[{accessorKey:"nama_pemohon",header:({column:e})=>a.jsx(u,{column:e,title:"Nama Pemohon"}),cell:({row:e})=>a.jsx("div",{className:"font-medium",children:e.getValue("nama_pemohon")})},{accessorKey:"jenis_fasilitas",header:({column:e})=>a.jsx(u,{column:e,title:"Jenis Fasilitas"}),cell:({row:e})=>a.jsx("div",{className:"max-w-[150px] truncate font-medium",children:e.getValue("jenis_fasilitas")})},{accessorKey:"tanggal_penggunaan",header:({column:e})=>a.jsx(u,{column:e,title:"Tanggal Penggunaan"}),cell:({row:e})=>a.jsx("div",{className:"text-sm",children:new Date(e.getValue("tanggal_penggunaan")).toLocaleDateString("id-ID",{year:"numeric",month:"short",day:"numeric"})})},{accessorKey:"keperluan",header:({column:e})=>a.jsx(u,{column:e,title:"Keperluan"}),cell:({row:e})=>a.jsx("div",{className:"max-w-[200px] truncate text-sm",children:e.getValue("keperluan")})},{accessorKey:"status",header:({column:e})=>a.jsx(u,{column:e,title:"Status Pengajuan"}),cell:({row:e})=>a.jsx(A,{status:e.getValue("status"),type:"event"}),filterFn:(e,c,p)=>p.includes(e.getValue(c))},{id:"actions",header:({column:e})=>a.jsx(u,{column:e,title:"Aksi"}),cell:({row:e})=>a.jsx(W,{row:e,onView:s,onEdit:d,onDelete:o})}];function za({type:s,data:d=[],searchPlaceholder:o,onView:e,onEdit:c,onDelete:p}){switch(s){case"hajatan":return a.jsx(R,{columns:Sa({onView:e,onEdit:c,onDelete:p}),data:d,searchPlaceholder:o,searchColumn:"nama_pemohon",enableStatusFilter:!0});case"acara-publik":return a.jsx(R,{columns:Ta({onView:e,onEdit:c,onDelete:p}),data:d,searchPlaceholder:o,searchColumn:"nama_penyelenggara",enableStatusFilter:!0});case"sarana-umum":return a.jsx(R,{columns:Ca({onView:e,onEdit:c,onDelete:p}),data:d,searchPlaceholder:o,searchColumn:"nama_pemohon",enableStatusFilter:!0});default:return null}}const y={formatDate:s=>new Date(s).toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),generateHajatnPrintContent:s=>`
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px; color: #1a1a1a;">PEMERINTAH DESA</h1>
          <h2 style="margin: 5px 0; font-size: 20px; color: #1a1a1a;">SURAT IZIN HAJATAN</h2>
          <div style="width: 100px; height: 2px; background: #333; margin: 10px auto;"></div>
          <p style="margin: 10px 0; font-size: 14px;">Nomor: ${s.id}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <p style="margin: 0 0 20px 0; line-height: 1.6;">
            Yang bertanda tangan di bawah ini, Kepala Desa menerangkan bahwa:
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; width: 200px; vertical-align: top;">Nama Pemohon</td>
              <td style="padding: 8px 0; width: 20px;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${s.nama_pemohon}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Jenis Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${s.jenis_acara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Tanggal Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${y.formatDate(s.tanggal_acara)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Lokasi Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${s.lokasi_acara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Dampak Keramaian</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${s.dampak_keramaian}</td>
            </tr>
          </table>

          <p style="margin: 20px 0; line-height: 1.6;">
            Berdasarkan permohonan yang bersangkutan, maka dengan ini kami memberikan izin untuk mengadakan acara tersebut dengan ketentuan:
          </p>

          <ol style="margin: 20px 0; padding-left: 20px; line-height: 1.6;">
            <li>Menjaga keamanan dan ketertiban selama acara berlangsung</li>
            <li>Tidak mengganggu ketenangan masyarakat sekitar</li>
            <li>Mematuhi protokol kesehatan yang berlaku</li>
            <li>Bertanggung jawab penuh terhadap acara yang diselenggarakan</li>
          </ol>

          <p style="margin: 20px 0; line-height: 1.6;">
            Demikian surat izin ini dibuat untuk dipergunakan sebagaimana mestinya.
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 50px;">
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Pemohon,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">${s.nama_pemohon}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Kepala Desa,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">________________</p>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            Status: <span style="font-weight: bold; color: ${s.status==="Disetujui"?"#10b981":s.status==="Ditolak"?"#ef4444":"#f59e0b"}">${s.status}</span>
          </p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
            Tanggal Pengajuan: ${y.formatDate(s.tanggal_pengajuan)}
          </p>
        </div>
      </div>
    `,generateAcaraPublikPrintContent:s=>`
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px; color: #1a1a1a;">PEMERINTAH DESA</h1>
          <h2 style="margin: 5px 0; font-size: 20px; color: #1a1a1a;">SURAT IZIN ACARA PUBLIK</h2>
          <div style="width: 100px; height: 2px; background: #333; margin: 10px auto;"></div>
          <p style="margin: 10px 0; font-size: 14px;">Nomor: ${s.id}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <p style="margin: 0 0 20px 0; line-height: 1.6;">
            Yang bertanda tangan di bawah ini, Kepala Desa menerangkan bahwa:
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; width: 200px; vertical-align: top;">Nama Penyelenggara</td>
              <td style="padding: 8px 0; width: 20px;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${s.nama_penyelenggara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Nama Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${s.nama_acara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Tanggal & Waktu Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${y.formatDate(s.tanggal_waktu_acara)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Lokasi Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${s.lokasi_acara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Rekomendasi Keamanan</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${s.rekomendasi_keamanan}</td>
            </tr>
          </table>

          <p style="margin: 20px 0; line-height: 1.6;">
            Berdasarkan permohonan yang bersangkutan, maka dengan ini kami memberikan izin untuk mengadakan acara tersebut dengan ketentuan:
          </p>

          <ol style="margin: 20px 0; padding-left: 20px; line-height: 1.6;">
            <li>Menjaga keamanan dan ketertiban selama acara berlangsung</li>
            <li>Tidak mengganggu ketenangan masyarakat sekitar</li>
            <li>Mematuhi protokol kesehatan yang berlaku</li>
            <li>Memiliki izin dari pihak kepolisian jika diperlukan</li>
            <li>Bertanggung jawab penuh terhadap acara yang diselenggarakan</li>
          </ol>

          <p style="margin: 20px 0; line-height: 1.6;">
            Demikian surat izin ini dibuat untuk dipergunakan sebagaimana mestinya.
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 50px;">
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Penyelenggara,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">${s.nama_penyelenggara}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Kepala Desa,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">________________</p>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            Status: <span style="font-weight: bold; color: ${s.status==="Disetujui"?"#10b981":s.status==="Ditolak"?"#ef4444":"#f59e0b"}">${s.status}</span>
          </p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
            Tanggal Pengajuan: ${y.formatDate(s.tanggal_pengajuan)}
          </p>
        </div>
      </div>
    `,generateSaranaUmumPrintContent:s=>`
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px; color: #1a1a1a;">PEMERINTAH DESA</h1>
          <h2 style="margin: 5px 0; font-size: 20px; color: #1a1a1a;">IZIN PENGGUNAAN SARANA UMUM</h2>
          <div style="width: 100px; height: 2px; background: #333; margin: 10px auto;"></div>
          <p style="margin: 10px 0; font-size: 14px;">Nomor: ${s.id}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <p style="margin: 0 0 20px 0; line-height: 1.6;">
            Yang bertanda tangan di bawah ini, Kepala Desa menerangkan bahwa:
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; width: 200px; vertical-align: top;">Nama Pemohon</td>
              <td style="padding: 8px 0; width: 20px;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${s.nama_pemohon}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Jenis Fasilitas</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${s.jenis_fasilitas}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Tanggal Penggunaan</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${y.formatDate(s.tanggal_penggunaan)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Keperluan</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${s.keperluan}</td>
            </tr>
          </table>

          <p style="margin: 20px 0; line-height: 1.6;">
            Berdasarkan permohonan yang bersangkutan, maka dengan ini kami memberikan izin untuk menggunakan sarana umum tersebut dengan ketentuan:
          </p>

          <ol style="margin: 20px 0; padding-left: 20px; line-height: 1.6;">
            <li>Menggunakan sarana umum sesuai dengan keperluan yang telah disebutkan</li>
            <li>Menjaga kebersihan dan keutuhan sarana umum</li>
            <li>Tidak merusak fasilitas yang ada</li>
            <li>Mengembalikan sarana umum dalam kondisi semula</li>
            <li>Bertanggung jawab penuh terhadap penggunaan sarana umum</li>
          </ol>

          <p style="margin: 20px 0; line-height: 1.6;">
            Demikian surat izin ini dibuat untuk dipergunakan sebagaimana mestinya.
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 50px;">
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Pemohon,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">${s.nama_pemohon}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Kepala Desa,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">________________</p>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            Status: <span style="font-weight: bold; color: ${s.status==="Disetujui"?"#10b981":s.status==="Ditolak"?"#ef4444":"#f59e0b"}">${s.status}</span>
          </p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
            Tanggal Pengajuan: ${y.formatDate(s.tanggal_pengajuan)}
          </p>
        </div>
      </div>
    `,printPermit:(s,d)=>{let o;switch(d){case"hajatan":o=y.generateHajatnPrintContent(s);break;case"acara-publik":o=y.generateAcaraPublikPrintContent(s);break;case"sarana-umum":o=y.generateSaranaUmumPrintContent(s);break;default:o=y.generateHajatnPrintContent(s)}const e=window.open("","_blank");e&&(e.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Cetak Surat Izin</title>
            <style>
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${o}
            <div class="no-print" style="text-align: center; margin: 20px 0;">
              <button onclick="window.print()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Cetak Dokumen
              </button>
              <button onclick="window.close()" style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                Tutup
              </button>
            </div>
          </body>
        </html>
      `),e.document.close(),e.focus())}};function Ma({data:s,type:d,open:o,onOpenChange:e}){if(!s)return null;const c=l=>new Date(l).toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=()=>{y.printPermit(s,d)},b=()=>{switch(d){case"hajatan":return"Detail Surat Izin Hajatan";case"acara-publik":return"Detail Surat Izin Acara Publik";case"sarana-umum":return"Detail Izin Penggunaan Sarana Umum";default:return"Detail Perizinan"}};return a.jsx(sa,{open:o,onOpenChange:e,children:a.jsxs(na,{className:"sm:max-w-[700px]",children:[a.jsx(ta,{children:a.jsx(ia,{className:"text-lg font-medium",children:b()})}),a.jsxs("div",{className:"space-y-4 py-4",children:[d==="hajatan"&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Nama Pemohon"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(J,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.nama_pemohon})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Jenis Acara"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(v,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.jenis_acara})]})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Lokasi Acara"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(O,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.lokasi_acara})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Tanggal Acara"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(Y,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:c(s.tanggal_acara)})]})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Dampak Keramaian"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(Q,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.dampak_keramaian==="Ya"?"bg-yellow-100 text-yellow-800":"bg-gray-100 text-gray-800"}`,children:s.dampak_keramaian})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Status Pengajuan"}),a.jsx(A,{status:s.status,type:"event"})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Tanggal Pengajuan"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(v,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:c(s.tanggal_pengajuan)})]})]}),a.jsx("div",{})]})]}),d==="acara-publik"&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Nama Penyelenggara"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(J,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.nama_penyelenggara})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Nama Acara"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(v,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.nama_acara})]})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Lokasi Acara"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(O,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.lokasi_acara})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Tanggal & Waktu Acara"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(Y,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.tanggal_waktu_acara})]})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Rekomendasi Keamanan"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(Q,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.rekomendasi_keamanan==="Sudah"?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:s.rekomendasi_keamanan})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Status Pengajuan"}),a.jsx(A,{status:s.status,type:"event"})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Tanggal Pengajuan"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(v,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:c(s.tanggal_pengajuan)})]})]}),a.jsx("div",{})]})]}),d==="sarana-umum"&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Nama Pemohon"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(J,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.nama_pemohon})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Jenis Fasilitas"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(ea,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.jenis_fasilitas})]})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Tanggal Penggunaan"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(Y,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:c(s.tanggal_penggunaan)})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Keperluan"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(O,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:s.keperluan})]})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Tanggal Pengajuan"}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(v,{className:"h-4 w-4 text-muted-foreground"}),a.jsx("span",{className:"text-sm",children:c(s.tanggal_pengajuan)})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{className:"text-sm font-medium text-muted-foreground",children:"Status Pengajuan"}),a.jsx(A,{status:s.status,type:"event"})]})]})]}),a.jsx("div",{className:"border-t pt-4",children:a.jsxs("p",{className:"text-sm text-gray-600",children:["ID Dokumen: ",s.id]})})]}),a.jsxs(la,{className:"gap-3",children:[a.jsx(B,{variant:"outline",onClick:()=>e(!1),children:"Tutup"}),a.jsxs(B,{onClick:p,variant:"default",className:"bg-black hover:bg-gray-800",children:[a.jsx(ha,{className:"h-4 w-4 mr-2"}),"Cetak"]})]})]})})}function $a({data:s,type:d,open:o,onOpenChange:e,onSave:c}){const[p,b]=h.useState(!1),[l,L]=h.useState({}),[i,k]=h.useState({});h.useEffect(()=>{s&&L({...s})},[s]);const E=()=>{const n={};return d==="hajatan"?(l.nama_pemohon||(n.nama_pemohon="Nama pemohon wajib diisi"),l.jenis_acara||(n.jenis_acara="Jenis acara wajib diisi"),l.tanggal_acara||(n.tanggal_acara="Tanggal acara wajib diisi"),l.lokasi_acara||(n.lokasi_acara="Lokasi acara wajib diisi"),l.dampak_keramaian||(n.dampak_keramaian="Dampak keramaian wajib diisi")):d==="acara-publik"?(l.nama_penyelenggara||(n.nama_penyelenggara="Nama penyelenggara wajib diisi"),l.nama_acara||(n.nama_acara="Nama acara wajib diisi"),l.tanggal_waktu_acara||(n.tanggal_waktu_acara="Tanggal & waktu acara wajib diisi"),l.lokasi_acara||(n.lokasi_acara="Lokasi acara wajib diisi"),l.rekomendasi_keamanan||(n.rekomendasi_keamanan="Rekomendasi keamanan wajib diisi")):d==="sarana-umum"&&(l.nama_pemohon||(n.nama_pemohon="Nama pemohon wajib diisi"),l.jenis_fasilitas||(n.jenis_fasilitas="Jenis fasilitas wajib diisi"),l.tanggal_penggunaan||(n.tanggal_penggunaan="Tanggal penggunaan wajib diisi"),l.keperluan||(n.keperluan="Keperluan wajib diisi")),k(n),Object.keys(n).length===0},x=(n,P)=>{L(N=>({...N,[n]:P})),i[n]&&k(N=>({...N,[n]:""}))},V=async n=>{if(n.preventDefault(),!!E()){b(!0);try{await new Promise(N=>setTimeout(N,1e3));const P={...l,tanggal_diubah:new Date().toISOString()};c(P),e(!1),alert("Data perizinan berhasil diperbarui")}catch{alert("Terjadi kesalahan saat memperbarui data")}finally{b(!1)}}},_=()=>{switch(d){case"hajatan":return"Edit Surat Izin Hajatan";case"acara-publik":return"Edit Surat Izin Acara Publik";case"sarana-umum":return"Edit Izin Penggunaan Sarana Umum";default:return"Edit Perizinan"}},S=()=>a.jsxs("div",{className:"space-y-4",children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"nama_pemohon",children:"Nama Pemohon"}),a.jsx(f,{id:"nama_pemohon",placeholder:"Masukkan nama pemohon",value:l.nama_pemohon||"",onChange:n=>x("nama_pemohon",n.target.value),className:i.nama_pemohon?"border-red-500":""}),i.nama_pemohon&&a.jsx("p",{className:"text-sm text-red-500",children:i.nama_pemohon})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"jenis_acara",children:"Jenis Acara"}),a.jsx(f,{id:"jenis_acara",placeholder:"Masukkan jenis acara",value:l.jenis_acara||"",onChange:n=>x("jenis_acara",n.target.value),className:i.jenis_acara?"border-red-500":""}),i.jenis_acara&&a.jsx("p",{className:"text-sm text-red-500",children:i.jenis_acara})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"tanggal_acara",children:"Tanggal Acara"}),a.jsx(f,{id:"tanggal_acara",type:"date",value:l.tanggal_acara||"",onChange:n=>x("tanggal_acara",n.target.value),className:i.tanggal_acara?"border-red-500":""}),i.tanggal_acara&&a.jsx("p",{className:"text-sm text-red-500",children:i.tanggal_acara})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"lokasi_acara",children:"Lokasi Acara"}),a.jsx(f,{id:"lokasi_acara",placeholder:"Masukkan lokasi acara",value:l.lokasi_acara||"",onChange:n=>x("lokasi_acara",n.target.value),className:i.lokasi_acara?"border-red-500":""}),i.lokasi_acara&&a.jsx("p",{className:"text-sm text-red-500",children:i.lokasi_acara})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"dampak_keramaian",children:"Dampak Keramaian"}),a.jsxs($,{value:l.dampak_keramaian,onValueChange:n=>x("dampak_keramaian",n),children:[a.jsx(K,{children:a.jsx(F,{placeholder:"Pilih dampak keramaian"})}),a.jsxs(I,{children:[a.jsx(j,{value:"Ya",children:"Ya"}),a.jsx(j,{value:"Tidak",children:"Tidak"})]})]}),i.dampak_keramaian&&a.jsx("p",{className:"text-sm text-red-500",children:i.dampak_keramaian})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"status",children:"Status"}),a.jsxs($,{value:l.status,onValueChange:n=>x("status",n),children:[a.jsx(K,{children:a.jsx(F,{placeholder:"Pilih status"})}),a.jsxs(I,{children:[a.jsx(j,{value:"Diproses",children:"Diproses"}),a.jsx(j,{value:"Disetujui",children:"Disetujui"}),a.jsx(j,{value:"Ditolak",children:"Ditolak"})]})]})]})]})]}),w=()=>a.jsxs("div",{className:"space-y-4",children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"nama_penyelenggara",children:"Nama Penyelenggara"}),a.jsx(f,{id:"nama_penyelenggara",placeholder:"Masukkan nama penyelenggara",value:l.nama_penyelenggara||"",onChange:n=>x("nama_penyelenggara",n.target.value),className:i.nama_penyelenggara?"border-red-500":""}),i.nama_penyelenggara&&a.jsx("p",{className:"text-sm text-red-500",children:i.nama_penyelenggara})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"nama_acara",children:"Nama Acara"}),a.jsx(f,{id:"nama_acara",placeholder:"Masukkan nama acara",value:l.nama_acara||"",onChange:n=>x("nama_acara",n.target.value),className:i.nama_acara?"border-red-500":""}),i.nama_acara&&a.jsx("p",{className:"text-sm text-red-500",children:i.nama_acara})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"tanggal_waktu_acara",children:"Tanggal & Waktu Acara"}),a.jsx(f,{id:"tanggal_waktu_acara",placeholder:"Masukkan tanggal dan waktu acara",value:l.tanggal_waktu_acara||"",onChange:n=>x("tanggal_waktu_acara",n.target.value),className:i.tanggal_waktu_acara?"border-red-500":""}),i.tanggal_waktu_acara&&a.jsx("p",{className:"text-sm text-red-500",children:i.tanggal_waktu_acara})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"lokasi_acara",children:"Lokasi Acara"}),a.jsx(f,{id:"lokasi_acara",placeholder:"Masukkan lokasi acara",value:l.lokasi_acara||"",onChange:n=>x("lokasi_acara",n.target.value),className:i.lokasi_acara?"border-red-500":""}),i.lokasi_acara&&a.jsx("p",{className:"text-sm text-red-500",children:i.lokasi_acara})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"rekomendasi_keamanan",children:"Rekomendasi Keamanan"}),a.jsxs($,{value:l.rekomendasi_keamanan,onValueChange:n=>x("rekomendasi_keamanan",n),children:[a.jsx(K,{children:a.jsx(F,{placeholder:"Pilih rekomendasi keamanan"})}),a.jsxs(I,{children:[a.jsx(j,{value:"Sudah",children:"Sudah"}),a.jsx(j,{value:"Belum",children:"Belum"})]})]}),i.rekomendasi_keamanan&&a.jsx("p",{className:"text-sm text-red-500",children:i.rekomendasi_keamanan})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"status",children:"Status"}),a.jsxs($,{value:l.status,onValueChange:n=>x("status",n),children:[a.jsx(K,{children:a.jsx(F,{placeholder:"Pilih status"})}),a.jsxs(I,{children:[a.jsx(j,{value:"Diproses",children:"Diproses"}),a.jsx(j,{value:"Disetujui",children:"Disetujui"}),a.jsx(j,{value:"Ditolak",children:"Ditolak"})]})]})]})]})]}),U=()=>a.jsxs("div",{className:"space-y-4",children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"nama_pemohon",children:"Nama Pemohon"}),a.jsx(f,{id:"nama_pemohon",placeholder:"Masukkan nama pemohon",value:l.nama_pemohon||"",onChange:n=>x("nama_pemohon",n.target.value),className:i.nama_pemohon?"border-red-500":""}),i.nama_pemohon&&a.jsx("p",{className:"text-sm text-red-500",children:i.nama_pemohon})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"jenis_fasilitas",children:"Jenis Fasilitas"}),a.jsx(f,{id:"jenis_fasilitas",placeholder:"Masukkan jenis fasilitas",value:l.jenis_fasilitas||"",onChange:n=>x("jenis_fasilitas",n.target.value),className:i.jenis_fasilitas?"border-red-500":""}),i.jenis_fasilitas&&a.jsx("p",{className:"text-sm text-red-500",children:i.jenis_fasilitas})]})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"tanggal_penggunaan",children:"Tanggal Penggunaan"}),a.jsx(f,{id:"tanggal_penggunaan",type:"date",value:l.tanggal_penggunaan||"",onChange:n=>x("tanggal_penggunaan",n.target.value),className:i.tanggal_penggunaan?"border-red-500":""}),i.tanggal_penggunaan&&a.jsx("p",{className:"text-sm text-red-500",children:i.tanggal_penggunaan})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"status",children:"Status"}),a.jsxs($,{value:l.status,onValueChange:n=>x("status",n),children:[a.jsx(K,{children:a.jsx(F,{placeholder:"Pilih status"})}),a.jsxs(I,{children:[a.jsx(j,{value:"Diproses",children:"Diproses"}),a.jsx(j,{value:"Disetujui",children:"Disetujui"}),a.jsx(j,{value:"Ditolak",children:"Ditolak"})]})]})]})]}),a.jsxs("div",{className:"space-y-2",children:[a.jsx(r,{htmlFor:"keperluan",children:"Keperluan"}),a.jsx("textarea",{id:"keperluan",placeholder:"Masukkan keperluan",className:`w-full px-3 py-2 border rounded-md min-h-[100px] ${i.keperluan?"border-red-500":"border-gray-300"}`,value:l.keperluan||"",onChange:n=>x("keperluan",n.target.value)}),i.keperluan&&a.jsx("p",{className:"text-sm text-red-500",children:i.keperluan})]})]}),D=()=>{switch(d){case"hajatan":return S();case"acara-publik":return w();case"sarana-umum":return U();default:return S()}};return s?a.jsx(sa,{open:o,onOpenChange:e,children:a.jsxs(na,{className:"sm:max-w-[700px] max-h-[90vh] overflow-y-auto",children:[a.jsx(ta,{children:a.jsxs(ia,{className:"flex items-center gap-2",children:[a.jsx(aa,{className:"h-5 w-5"}),_()]})}),a.jsxs("form",{onSubmit:V,className:"space-y-6",children:[D(),a.jsxs(la,{className:"flex gap-2",children:[a.jsxs(B,{type:"button",variant:"outline",onClick:()=>e(!1),disabled:p,children:[a.jsx(ua,{className:"h-4 w-4 mr-2"}),"Batal"]}),a.jsxs(B,{type:"submit",disabled:p,children:[a.jsx(aa,{className:"h-4 w-4 mr-2"}),p?"Menyimpan...":"Simpan Perubahan"]})]})]})]})}):null}const Ka=[{title:"Dashboard",href:"/dashboard"},{title:"Manajemen Perizinan Acara",href:"/perizinan-acara"}],Fa={hajatan:v,"acara-publik":Aa,"sarana-umum":ea};function Xa(){const[s,d]=h.useState("hajatan"),[o,e]=h.useState(null),[c,p]=h.useState(!1),[b,l]=h.useState(!1),[L,i]=h.useState(!1),[k,E]=h.useState(null),[x,V]=h.useState(!1),[_,S]=h.useState(ja),[w,U]=h.useState(ka),[D,n]=h.useState(fa),P=[{key:"hajatan",label:"Perizinan Hajatan",data:_},{key:"acara-publik",label:"Perizinan Acara Publik",data:w},{key:"sarana-umum",label:"Perizinan Penggunaan Sarana Umum",data:D}],N=t=>{e(t),p(!0)},ra=t=>{e(t),l(!0)},da=t=>{E(t),i(!0)},ca=t=>{switch(s){case"hajatan":{const g=_.map(m=>m.id===t.id?t:m);S(g);break}case"acara-publik":{const g=w.map(m=>m.id===t.id?t:m);U(g);break}case"sarana-umum":{const g=D.map(m=>m.id===t.id?t:m);n(g);break}}l(!1),alert("Data berhasil diperbarui")},ma=async()=>{if(k){V(!0);try{switch(await new Promise(t=>setTimeout(t,1e3)),s){case"hajatan":{const t=_.filter(g=>g.id!==k.id);S(t);break}case"acara-publik":{const t=w.filter(g=>g.id!==k.id);U(t);break}case"sarana-umum":{const t=D.filter(g=>g.id!==k.id);n(t);break}}i(!1),E(null),alert("Data berhasil dihapus")}catch{alert("Terjadi kesalahan saat menghapus data")}finally{V(!1)}}},Z=()=>{if(!k)return{title:"",description:""};let t="",g="";switch(s){case"hajatan":{const m=k;t="Hapus Surat Izin Hajatan",g=`Apakah Anda yakin ingin menghapus surat izin hajatan untuk ${m.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;break}case"acara-publik":{const m=k;t="Hapus Surat Izin Acara Publik",g=`Apakah Anda yakin ingin menghapus surat izin acara publik "${m.nama_acara}" dari ${m.nama_penyelenggara}? Tindakan ini tidak dapat dibatalkan.`;break}case"sarana-umum":{const m=k;t="Hapus Izin Penggunaan Sarana Umum",g=`Apakah Anda yakin ingin menghapus izin penggunaan sarana umum untuk ${m.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;break}default:t="Hapus Data",g="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."}return{title:t,description:g}},G=t=>{switch(t){case"hajatan":return _;case"acara-publik":return w;case"sarana-umum":return D;default:return[]}},q=t=>({total:t.length,diproses:t.filter(m=>m.status==="Diproses").length,disetujui:t.filter(m=>m.status==="Disetujui").length,ditolak:t.filter(m=>m.status==="Ditolak").length}),oa=G(s),H=q(oa);return a.jsxs(xa,{breadcrumbs:Ka,children:[a.jsx(ga,{title:"Manajemen Perizinan Acara"}),a.jsxs("div",{className:"container mx-auto py-8 px-6",children:[a.jsxs("div",{className:"flex items-center justify-between mb-8",children:[a.jsxs("div",{children:[a.jsx("h1",{className:"text-3xl font-bold tracking-tight",children:"Manajemen Perizinan Acara"}),a.jsx("p",{className:"text-muted-foreground mt-1",children:"Kelola semua jenis perizinan acara dalam satu dashboard"})]}),a.jsx("div",{className:"flex items-center gap-2",children:a.jsxs(X,{variant:"outline",className:"flex items-center gap-1 px-3 py-1",children:[a.jsx(ya,{className:"h-3.5 w-3.5"}),a.jsx("span",{children:"Perizinan Aktif"})]})})]}),a.jsxs("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8",children:[a.jsxs(T,{className:"shadow-sm",children:[a.jsxs(C,{className:"flex flex-row items-center justify-between space-y-0 pb-3",children:[a.jsx(z,{className:"text-sm font-medium",children:"Total Pengajuan"}),a.jsx(v,{className:"h-4 w-4 text-muted-foreground"})]}),a.jsxs(M,{children:[a.jsx("div",{className:"text-2xl font-bold",children:H.total}),a.jsx("p",{className:"text-xs text-muted-foreground",children:"Semua pengajuan perizinan"})]})]}),a.jsxs(T,{className:"shadow-sm",children:[a.jsxs(C,{className:"flex flex-row items-center justify-between space-y-0 pb-3",children:[a.jsx(z,{className:"text-sm font-medium",children:"Diproses"}),a.jsx("div",{className:"h-2 w-2 rounded-full bg-yellow-500"})]}),a.jsxs(M,{children:[a.jsx("div",{className:"text-2xl font-bold",children:H.diproses}),a.jsx("p",{className:"text-xs text-muted-foreground",children:"Sedang dalam proses"})]})]}),a.jsxs(T,{className:"shadow-sm",children:[a.jsxs(C,{className:"flex flex-row items-center justify-between space-y-0 pb-3",children:[a.jsx(z,{className:"text-sm font-medium",children:"Disetujui"}),a.jsx("div",{className:"h-2 w-2 rounded-full bg-green-500"})]}),a.jsxs(M,{children:[a.jsx("div",{className:"text-2xl font-bold",children:H.disetujui}),a.jsx("p",{className:"text-xs text-muted-foreground",children:"Telah disetujui"})]})]}),a.jsxs(T,{className:"shadow-sm",children:[a.jsxs(C,{className:"flex flex-row items-center justify-between space-y-0 pb-3",children:[a.jsx(z,{className:"text-sm font-medium",children:"Ditolak"}),a.jsx("div",{className:"h-2 w-2 rounded-full bg-red-500"})]}),a.jsxs(M,{children:[a.jsx("div",{className:"text-2xl font-bold",children:H.ditolak}),a.jsx("p",{className:"text-xs text-muted-foreground",children:"Telah ditolak"})]})]})]}),a.jsxs(T,{className:"shadow-sm",children:[a.jsxs(C,{className:"pb-4",children:[a.jsx(z,{children:"Data Perizinan Acara"}),a.jsx(pa,{children:"Kelola semua jenis perizinan acara yang diajukan warga"})]}),a.jsx(M,{className:"px-5",children:a.jsxs(Na,{value:s,onValueChange:d,className:"w-full",children:[a.jsx(va,{className:"grid grid-cols-3 w-full mb-8",children:P.map(t=>{const g=Fa[t.key],m=q(t.data);return a.jsxs(ba,{value:t.key,className:"flex flex-col items-center gap-2 p-4 h-auto",children:[a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx(g,{className:"h-4 w-4"}),a.jsxs("span",{className:"text-xs font-medium",children:[t.key==="hajatan"&&"HAJATAN",t.key==="acara-publik"&&"ACARA PUBLIK",t.key==="sarana-umum"&&"SARANA UMUM"]})]}),a.jsx(X,{variant:"secondary",className:"text-xs",children:m.total})]},t.key)})}),P.map(t=>{const g=G(t.key);return a.jsx(_a,{value:t.key,className:"mt-2",children:a.jsxs("div",{className:"space-y-6",children:[a.jsx("div",{className:"flex items-center justify-between mb-2",children:a.jsxs("div",{children:[a.jsx("h3",{className:"text-lg font-semibold",children:t.label}),a.jsxs("p",{className:"text-sm text-muted-foreground",children:["Total ",g.length," pengajuan"]})]})}),a.jsx(za,{type:t.key,data:t.data,searchPlaceholder:`Cari ${t.label.toLowerCase()}...`,onView:N,onEdit:ra,onDelete:da})]})},t.key)})]})})]})]}),a.jsx(Ma,{data:o,type:s,open:c,onOpenChange:p}),a.jsx($a,{data:o,type:s,open:b,onOpenChange:l,onSave:ca}),a.jsx(wa,{open:L,onOpenChange:i,onConfirm:ma,title:Z().title,description:Z().description,isLoading:x})]})}export{Xa as default};
