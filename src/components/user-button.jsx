import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  // Add a null check for session before accessing session.user
  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
  };

  return (
    <nav>
      {session ? (
        <div>
          {/* Dropdown Menu */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
              <div className="flex items-center gap-4">
                <span>{session.user?.name}</span>
                <Avatar className="size-10 hover:opacity-75 transition">
                  <AvatarImage
                    className="size-10 hover:opacity-75 transition"
                    src={session.user?.image || undefined}
                  />
                  <AvatarFallback className="bg-sky-900 text-white">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="bottom" className="w-50">
              <DropdownMenuItem className="h-10" onClick={() => handleSignOut()}>
                LogOut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Space between Dropdown and Navigation Links */}
          <div className="mt-8"> {/* Adjusted margin-top to provide more space */}
            {/* Navigation Links */}
            <nav className="flex justify-between space-x-4 mb-4">
              <Link className="text-2xl font-bold" href="/">
                CRUD Application
              </Link>
              <Link
                className="bg-slate-900 grid place-items-center text-white p-3 rounded-full shadow-md"
                href="/create-task"
              >
                Add New Task
              </Link>
            </nav>
          </div>
        </div>
      ) : (
        <div className="flex justify-end gap-4 p-4">
          <Button>
            <Link href="login">Login</Link>
          </Button>
          <Button>
            <Link href="sign-up">Sign-Up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default UserButton;
