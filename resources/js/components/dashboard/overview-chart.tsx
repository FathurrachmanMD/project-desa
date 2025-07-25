import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { hajatnData, acaraPublikData, saranaUmumData } from '@/data/event-permits';
import { imbData, lahanDesaData, tidakSengketaData, renovasiData } from '@/data/building-permits';
import { 
  pengantarSKCKData, 
  keteranganDomisiliData, 
  izinTinggalPendatangData, 
  izinKeluarNegeriData, 
  keteranganTidakBekerjaData 
} from '@/data/personal-permits';
import { skuData, iumkData, situData, nibData } from '@/data/business-permits';
import { izinLahanData, rekomendasiPupukData, suratKeteranganPetaniData } from '@/data/agriculture-permits';

// Custom Tooltip Component dengan styling yang lebih baik
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 shadow-xl">
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center border-b border-gray-200 dark:border-gray-700 pb-2">
          {`Bulan ${label}`}
        </p>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {entry.name}
                </span>
              </div>
              <span className="text-sm font-bold" style={{ color: entry.color }}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Total: {payload.reduce((sum, entry) => sum + (entry.value || 0), 0)} perizinan
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// Function to count permits by month
const getMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  
  // Get all permits data
  const allEventPermits = [...hajatnData, ...acaraPublikData, ...saranaUmumData];
  const allBuildingPermits = [...imbData, ...lahanDesaData, ...tidakSengketaData, ...renovasiData];
  const allPersonalPermits = [...pengantarSKCKData, ...keteranganDomisiliData, ...izinTinggalPendatangData, ...izinKeluarNegeriData, ...keteranganTidakBekerjaData];
  const allBusinessPermits = [...skuData, ...iumkData, ...situData, ...nibData];
  const allAgriculturePermits = [...izinLahanData, ...rekomendasiPupukData, ...suratKeteranganPetaniData];
  
  return months.map((month, index) => {
    // Count permits by month (simplified - using modulo for demo)
    const monthIndex = index + 1;
    
    const countByMonth = (permits: Array<{ tanggal_pengajuan: string }>) => {
      return permits.filter((permit) => {
        const date = new Date(permit.tanggal_pengajuan);
        return date.getMonth() + 1 === monthIndex;
      }).length;
    };
    
    return {
      name: month,
      acara: countByMonth(allEventPermits),
      bangunan: countByMonth(allBuildingPermits),
      pribadi: countByMonth(allPersonalPermits),
      usaha: countByMonth(allBusinessPermits),
      pertanian: countByMonth(allAgriculturePermits),
    };
  });
};

const monthlyData = getMonthlyData();

export function OverviewChart() {
  return (
    <div className="h-[280px] sm:h-[320px] lg:h-[380px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorAcara" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="colorBangunan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="colorPribadi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="colorUsaha" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="colorPertanian" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.6}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            stroke="#888888"
            fontSize={13}
            tickLine={false}
            axisLine={false}
            className="text-xs sm:text-sm"
          />
          <YAxis
            stroke="#888888"
            fontSize={13}
            tickLine={false}
            axisLine={false}
            className="text-xs sm:text-sm"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)', radius: 4 }}
          />
          <Legend />
          <Bar 
            dataKey="acara" 
            fill="url(#colorAcara)" 
            radius={[6, 6, 0, 0]}
            name="Perizinan Acara"
          />
          <Bar 
            dataKey="bangunan" 
            fill="url(#colorBangunan)" 
            radius={[6, 6, 0, 0]}
            name="Perizinan Bangunan"
          />
          <Bar 
            dataKey="pribadi" 
            fill="url(#colorPribadi)" 
            radius={[6, 6, 0, 0]}
            name="Perizinan Pribadi"
          />
          <Bar 
            dataKey="usaha" 
            fill="url(#colorUsaha)" 
            radius={[6, 6, 0, 0]}
            name="Perizinan Usaha"
          />
          <Bar 
            dataKey="pertanian" 
            fill="url(#colorPertanian)" 
            radius={[6, 6, 0, 0]}
            name="Perizinan Pertanian"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
