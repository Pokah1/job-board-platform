// "use client";

// import { useState } from "react";
// import { useProfile } from "@/context/ProfileContext";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import ProfileForm from "./ProfileForm";
// import { Button } from "@/components/ui/button";



// export default function MyProfileCard() {
//   const { myProfile, deleteProfile, loading } = useProfile();
//   const [open, setOpen] = useState(false);

//   if (!myProfile) {
//     return <p>You haven’t created a profile yet.</p>;
//   }


//   const handleDelete = async () => {
//     if (confirm("Are you sure you want to delete your profile?")) {
//       await deleteProfile(myProfile.id);
//     }
//   };


//   return (
//     <div className="p-4 border rounded-lg shadow-sm">
//       <h2 className="text-lg font-bold">{myProfile.user.username}</h2>
//       <p>{myProfile.job_title}</p>
//       <p className="text-sm text-gray-500">{myProfile.city}, {myProfile.country}</p>

//       <div className="mt-4 flex gap-2">
//         {/* Edit Profile Button */}
//          <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button variant="outline">Edit</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Edit My Profile</DialogTitle>
//             </DialogHeader>
//             <ProfileForm mode="edit" onSuccess={() => setOpen(false)} />
//           </DialogContent>
//         </Dialog>

//         {/* Delete Profile Button */}
//         <Button variant="destructive" onClick={handleDelete} disabled={loading}>
//           Delete
//         </Button>
//       </div>
//     </div>
//   );
// }
