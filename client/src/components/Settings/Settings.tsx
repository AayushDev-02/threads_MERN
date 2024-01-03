
import { Separator } from "../ui/separator"
import AccountForm from "./AccountForm"
import ProfileForm from "./ProfileForm"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6 h-full overflow-y-scroll scrollbar-track-transparent scrollbar-thin scrollbar-thumb-secondary  px-20 lg:px-40 xl:px-72 ">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Here you can update your login credentials
        </p>
      </div>
      <AccountForm/>
    </div>
  )
}