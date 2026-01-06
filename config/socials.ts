import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "GitHub",
    username: "@kapilyadav131415-creator",
    icon: Icons.gitHub,
    link: "https://github.com/kapilyadav131415-creator",
  },

  {
    name: "LinkedIn",
    username: "Kapil Yadav",
    icon: Icons.linkedin,
    link: "https://linkedin.com/in/kapilsiss",
  },

  {
    name: "Email",
    username: "sisskapil@gmail.com",
    icon: Icons.gmail,
    link: "mailto:sisskapil@gmail.com",
  },
];