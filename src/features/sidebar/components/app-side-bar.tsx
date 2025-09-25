'use client';
import {
  ChatAdd01Icon,
  Delete02Icon,
  MoreHorizontalIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/animate-ui/radix/sidebar';
import { cn } from '@/lib/utils';
import { useDeleteChat, useQueryHistory } from '@/store';
import { AppLogo } from './app-logo';

export const AppSidebar = () => {
  const router = useRouter();
  const params = useParams() as { id?: string };
  const {
    data = {
      chats: [],
    },
  } = useQueryHistory();

  const { mutate: deleteChatByIdMutation } = useDeleteChat();

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
                    <HugeiconsIcon icon={ChatAdd01Icon} />
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <HugeiconsIcon icon={MoreHorizontalIcon} />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align={'start'}
                      className="w-48 rounded-lg"
                      side={'right'}
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          deleteChatByIdMutation({ id: item.id });
                          router.push('/');
                        }}
                        variant="destructive"
                      >
                        <HugeiconsIcon icon={Delete02Icon} />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
