import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
  return (
    <div className="page flex-col">
      {/* Email section */}
      <div className="flex w-full justify-between p-4 items-center">
        <div className="flex flex-col w-full">
          <Label className="text-4xl">Email</Label>
          <Label className="text-lg text-secondary-text">Email associated with your account.</Label>
        </div>
        <Button className="min-w-30 py-5 px-6">
          Verify
        </Button>
      </div>
      <Separator />

      {/* Password section */}
      <div className="flex w-full justify-between p-4 items-center">
        <div className="flex flex-col w-full">
          <Label className="text-4xl">Password</Label>
          <Label className="text-lg text-secondary-text">Change password.</Label>
        </div>
        <Button className="min-w-30 py-5 px-6">
          Change
        </Button>
      </div>
      <Separator />

      {/* Delete section */}
      <div className="flex w-full justify-between p-4 items-center">
        <div className="flex flex-col w-full">
          <Label className="text-4xl">Delete Account</Label>
          <Label className="text-lg text-secondary-text">This action cannot be undone</Label>
        </div>
        <Button className="min-w-30 py-5 px-6" variant="destructive">
          Delete
        </Button>
      </div>
      <Separator />
    </div>
  )
}
export default ProfilePage;