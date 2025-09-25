// app/resume-checker/page.tsx

import ATSResumeChecker from "../../components/ats/ATSResumeChecker";


export default function ResumeCheckerPage() {
  return (
    <div>
      <ATSResumeChecker />
    </div>
  );
}

// Or use it as a component in any other page
// import ATSResumeChecker from '@/components/ats/ATSResumeChecker';
// 
// export default function HomePage() {
//   return (
//     <div className="container mx-auto">
//       <h1>My App</h1>
//       <ATSResumeChecker />
//     </div>
//   );
// }