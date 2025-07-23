'use client';
import { MessageSquareDashedIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/animate-ui/radix/sidebar';
import { api } from '@/trpc/react';
import { AppLogo } from './app-logo';

export const AppSidebar = () => {
  const router = useRouter();
  const { data: conversations } = api.conversation.list.useQuery();

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="flex">
        <AppLogo
          className="cursor-pointer"
          onClick={() => router.push('/')}
          size={45}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <MessageSquareDashedIcon />
                    新的聊天
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>聊天</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/chat/${item.id}`}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
