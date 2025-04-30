import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import GradingIcon from '@mui/icons-material/Grading';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';


const iconMap = {
  "📚": CreditScoreIcon,
  "✅": LibraryAddCheckIcon,
  "⏰": ChecklistRtlIcon
};

export default function StatsCard({ title, value, icon }) {
  let IconComponent;

  // Choose icon based on title if not explicitly mapped
  if (iconMap[icon]) {
    IconComponent = iconMap[icon];
  } else if (title.includes("Course Enrolled")) {
    IconComponent = CreditScoreIcon;
  } else if (title.includes("Course Completed")) {
    IconComponent = LibraryAddCheckIcon;
  } else if (title.includes("Activities Completed")) {
    IconComponent = GradingIcon;
  } else {
    IconComponent = ChecklistRtlIcon;
  }

  return (
    <div className="stats-card">
      <div className="stats-card-icon-container">
        <IconComponent sx={{ fontSize: 40, color: "#4A044E" }} />
      </div>
      <div>
        <div className="stats-card-value">{value}</div>
        <div className="stats-card-title">{title}</div>
      </div>
    </div>
  );
}