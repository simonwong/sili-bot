'use client';
import {
  ChatAdd01Icon,
  Delete02Icon,
  MoreHorizontalIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { AppLogo } from '@/components/app-logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
} from '@/components/ui/sidebar';
import { useDeleteHistoryChat, useHistoryQuery } from '@/features/history';

export const ChatSidebar = () => {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const { data } = useHistoryQuery();
  const chats = data?.chats ?? [];

  const { mutate: deleteChatByIdMutation } = useDeleteHistoryChat();

  return (
    <Sidebar variant='floating'>
      <SidebarHeader className='flex'>
        <AppLogo className='cursor-pointer' size={45} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link to='/' />}>
                  <HugeiconsIcon icon={ChatAdd01Icon} />
                  <span>新的聊天</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>聊天</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={pathname === `/chat/${item.id}`}
                    render={<Link params={{ id: item.id }} to='/chat/$id' />}
                  >
                    <span className='truncate'>{item.title}</span>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<SidebarMenuAction showOnHover />}
                    >
                      <HugeiconsIcon icon={MoreHorizontalIcon} />
                      <span className='sr-only'>More</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align={'start'}
                      className='w-48 rounded-lg'
                      side={'right'}
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          deleteChatByIdMutation({ id: item.id });
                          navigate({
                            to: '/',
                          });
                        }}
                        variant='destructive'
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
