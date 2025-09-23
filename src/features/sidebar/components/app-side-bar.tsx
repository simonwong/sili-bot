'use client';
import { MessageSquareDashedIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
import { cn } from '@/lib/utils';
import { useQueryHistory } from '@/store';
import { AppLogo } from './app-logo';

export const AppSidebar = () => {
  const router = useRouter();
  const params = useParams() as { id?: string };
  const {
    data = {
      chats: [],
    },
  } = useQueryHistory();

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
              {data.chats?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={cn(
                        params.id === item.id &&
                          'bg-accent text-accent-foreground'
                      )}
                      href={`/chat/${item.id}`}
                    >
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
