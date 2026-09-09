import type {
  NavBarLink,
  SocialLink,
  Identity,
  AboutPageContent,
  ProjectPageContent,
  BlogPageContent,
  HomePageContent,
} from "./types/config";

export const identity: Identity = {
  name: "BAO LOC BDS",
  logo: "/logo.webp",
  email: "thienphuocera@gmail.com",
};

export const contactLinks = {
  phone: "tel:0965027930",
  zalo: "https://zalo.me/0965027930",
  email: "mailto:thienphuocera@gmail.com",
};

export const navBarLinks: NavBarLink[] = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Dự án",
    url: "/du-an/",
  },
  {
    title: "Thị trường",
    url: "/thi-truong/",
  },
  {
    title: "Tài chính",
    url: "/tai-chinh/",
  },
  {
    title: "Liên hệ",
    url: "/lien-he/",
  },
];



export const socialLinks: SocialLink[] = [
  {
    title: "096 502 7930",
    url: contactLinks.phone,
    icon: "mdi:phone",
  },
  
  {
    title: "Nhắn tin zalo",
    url: contactLinks.zalo,
    external: true,
  },
  
  {
    title: "Email",
    url: contactLinks.email,
    icon: "mdi:email",
  },
];

// Home (/)
export const homePageContent: HomePageContent = {
  seo: {
    title:
      "Bất Động Sản Bảo Lộc | Mua Bán Đất, Nhà Đất Bảo Lộc | Phú Gia Bảo Lộc",

    description:
      "Chia sẻ góc nhìn thực tế về bất động sản Bảo Lộc, thị trường, dự án và những câu chuyện phía sau mỗi quyết định xuống tiền",

    image: "/images/social/baolocbds-homepage-og.jpg",
  },

  role: "Bất động sản • Bảo Lộc • Góc nhìn thực tế",

  description:
    "BAO LOC BDS – Chuyên tư vấn bất động sản Bảo Lộc. Cập nhật đất nền, nhà đất, dự án, giá bán và thông tin thị trường Bảo Lộc minh bạch, thực tế",

  socialLinks: socialLinks,
};

// About (/about)
export const aboutPageContent: AboutPageContent = {
  seo: {
    title: "Bất Động Sản Bảo Lộc | Phước – Tư Vấn Nhà Đất Bảo Lộc",
    description:
      "Phước tư vấn bất động sản Bảo Lộc với thông tin thực tế, minh bạch và dễ hiểu. Khám phá đất nền, nhà đất, dự án và cơ hội đầu tư tại Bảo Lộc.",
    image: identity.logo,
  },
  subtitle: "Phước : 096 502 7930",
  about: {
    description: `
"Chia sẻ góc nhìn thực tế về bất động sản Bảo Lộc, thị trường, dự án và những câu chuyện phía sau mỗi quyết định xuống tiền."
<br/><br/>
Bất động sản Bảo Lộc — thị trường, dự án, góc nhìn thực tế và những câu chuyện phía sau mỗi giao dịch.`, // Markdown is supported
    image_l: {
      url: "/demo-1.jpg",
      alt: "Left Picture",
    },
    image_r: {
      url: "/demo-1.jpg",
      alt: "Right Picture",
    },
  },
  work: {
    description: `tư vấn bất động sản Bảo Lộc với thông tin thực tế, minh bạch và dễ hiểu. Khám phá đất nền, nhà đất, dự án và cơ hội đầu tư tại Bảo Lộc`, // Markdown is supported
    items: [
      {
        title: "Software Developer",
        company: {
          name: "Freelance",
          image: "/logo.webp",
          url: "https://baolocbds.com/lien-he",
        },
        date: "2021 - Present",
      },
      {
        title: "Software Developer",
        company: {
          name: "Freelance",
          image: "/logo.webp",
          url: "https://baolocbds.com/lien-he",
        },
        date: "2019 - 2021",
      },
    ],
  },
  connect: {
    description: `Phước tư vấn bất động sản Bảo Lộc với thông tin thực tế, minh bạch và dễ hiểu. Khám phá đất nền, nhà đất, dự án và cơ hội đầu tư tại Bảo Lộc.`, // Markdown is supported
    links: socialLinks,
  },
};

// Projects (/projects)
export const projectsPageContent: ProjectPageContent = {
  seo: {
    title: "Projects | Tim Witzdam",
    description: "Check out what I've been working on.",
    image: identity.logo,
  },
  subtitle: "Check out what I've been working on.",
  projects: [
    {
      title: "Project 1",
      description: "Project 1 Description",
      image: "/demo-2.jpg",
      year: "2024",
      url: "https://baolocbds.com/lien-he",
    },
    {
      title: "Project 1",
      description: "Project 1 Description",
      image: "/demo-2.jpg",
      year: "2024",
      url: "https://baolocbds.com/lien-he",
    },
    {
      title: "Project 1",
      description: "Project 1 Description",
      image: "/demo-2.jpg",
      year: "2024",
      url: "https://baolocbds.com/lien-he",
    },
  ],
};

// Blog (/blog)
export const blogPageContent: BlogPageContent = {
  seo: {
    title: "Blog | BAO LOC BDS",
    description: "thông tin thị trường Bảo Lộc",
    image: identity.logo,
  },
  subtitle: "thông tin thị trường Bảo Lộc",
};
