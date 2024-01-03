
import { Separator } from "../ui/separator"
import ProfileForm from "./ProfileForm"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6 h-full px-20 lg:px-40 xl:px-72 ">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}