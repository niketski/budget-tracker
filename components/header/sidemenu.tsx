import { Menu } from 'lucide-react'
import { 
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

const SideMenu = () => {
    return <>
        <Sheet>
            <SheetTrigger aria-label="Open Menu">
                <Menu color="#008235" size={32}/>    
            </SheetTrigger>        
        </Sheet>
    </>;
}
 
export default SideMenu;