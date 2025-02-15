'use client'

import { UserCheck, AlarmClockPlus, Settings, LogOut, BookUserIcon, CalendarCheck, ReceiptText, List } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import useFetchClasses from "@/hooks/useFetchClasses"

// Menu items.

type Item = {
  title: string;
  url: string;
  icon: any;
  sub?: { title: string; url: string; icon?: any }[];
}

type Items = Item[];


export function AppSidebar() {
  const [ items, setItems ] = useState<Items>([]);
  const {user, loading, logOut} = useContext(AuthContext);
  const {classObject} = useFetchClasses();
  const router = useRouter();

  
  useEffect(() => {
    const admin_items = [
      {
        title: "Student",
        url: "/dashboard/students/list",
        icon: BookUserIcon,
        
      },
      {
        title: "Attendance",
        url: "/dashboard/attendence/list",
        icon: CalendarCheck,
        
      },
      {
        title: "Give Attendance",
        url: "#",
        icon: AlarmClockPlus,
        sub: classObject.map((klass) => ({
          title: klass.full_klass,
          url: `/dashboard/attendence/${klass.id}`
        })),
      },
      {
        title: "Finance",
        url: "#",
        icon: ReceiptText,
        sub: [
          {
            title: "Payment List",
            url: "/dashboard/finance/bill/payment-list",
            icon: List
    
          }
        ]
      },
      {
        title: "Authetication",
        url: "#",
        icon: UserCheck,
        sub: [
          {
            title: "Login",
            url: "/authentication/login",
          },
          {
            title: "Register",
            url: "/authentication/registration",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ]
    
    const student_items = [
      {
        title: "Attendance",
        url: "/dashboard/attendence/list",
        icon: CalendarCheck,
        
      },
      {
        title: "MyAttendence",
        url: "/dashboard/students/99/attendance",
        icon: AlarmClockPlus,
      },
      {
        title: "Finance",
        url: "#",
        icon: ReceiptText,
        sub: [
          {
            title: "Payment List",
            url: "/dashboard/finance/bill/payment-list",
    
          },
          {
            title: "Bills", 
            url:"/dashboard/finance/bill/99"
    
          }
        ]
      },
      {
        title: "Authetication",
        url: "#",
        icon: UserCheck,
        sub: [
          
          {
            title: "Login",
            url: "/authentication/login",
          },
          {
            title: "Register",
            url: "/authentication/registration",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ]
    
      setItems(user?.user_type === 'student' ? student_items : admin_items)
  }, [user, classObject])


  useEffect(() => {
    if(!user &&  !loading){
      return router.push('/authentication/login');
    }
  }, [user, loading])

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (

                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                    {item.sub !== undefined &&
                    <SidebarMenuSub>
                      {item.sub.map((subItem: { title: string; url: string; icon?: any }) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  }
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent>
            {
              user && (
                <SidebarMenuButton asChild isActive>
                    <Button onClick={logOut} >
                        <LogOut/>
                        <span  className="text-red-500" >Log Out</span>
                    </Button>
                </SidebarMenuButton>
              )
            }
                
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}
