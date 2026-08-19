import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { User2 } from "lucide-react"
import { signOut } from "@/auth";

const SidebarLogoutButton = () => {


    return (  
        <form action={async () => {
        "use server";
        await signOut();
        }}>
            <SidebarMenuButton type="submit">
            <User2 /> Nico
            </SidebarMenuButton>
        </form>
    );
}
 
export default SidebarLogoutButton;