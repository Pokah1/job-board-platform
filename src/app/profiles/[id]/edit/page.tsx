// // app/profiles/[id]/edit/page.tsx
// "use client";

// import { useParams } from "next/navigation";
// import  ProfileEditForm  from "@/components/profiles/ProfileEditForm";

// export default function EditProfilePage() {
//   const { id } = useParams();

//   if (!id) return <p>Invalid profile ID</p>;

//   return (
//     <main className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
//       <ProfileEditForm profileId={Number(id)} />
//     </main>
//   );
// }
