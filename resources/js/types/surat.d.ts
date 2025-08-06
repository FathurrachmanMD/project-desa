export interface Surat {
  id: number;
  form: any;
  // initials: string;
  // activity: string;
  // type: 'event' | 'building' | 'personal' | 'business' | 'agricultural';
  status: string;
  format: {nama: string, kategori: {nama: string}};
  // time: string;
  created_at: String;
  // date: Date; // Add actual date for proper sorting
}