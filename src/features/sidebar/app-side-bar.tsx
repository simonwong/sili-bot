'use client';
import {
  ChatAdd01Icon,
  Delete02Icon,
  MoreHorizontalIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link, useNavigate } from '@tanstack/react-router';
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
import { useDeleteChat, useQueryHistory } from '@/store';

export const ChatSidebar = () => {
  const navigate = useNavigate();
  // const id = useParams({ from: '/chat/$id', select: (params) => params.id });
  const {
    data = {
      chats: [],
    },
  } = useQueryHistory();

  const { mutate: deleteChatByIdMutation } = useDeleteChat();

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
                <SidebarMenuButton>
                  <Link className='flex items-center gap-2' to='/'>
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
                  <SidebarMenuButton>
                    {/* <Link
                      className={cn(
                        id === item.id &&
                          'bg-accent text-accent-foreground'
                      )}
                      params={{ id: item.id }}
                      to='/chat/$id'
                    >
                      <span>{item.title}</span>
                    </Link> */}
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <SidebarMenuAction showOnHover>
                        <HugeiconsIcon icon={MoreHorizontalIcon} />
                        <span className='sr-only'>More</span>
                      </SidebarMenuAction>
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
