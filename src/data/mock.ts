export type User = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  online: boolean;
};

export type Story = {
  id: string;
  userId: string;
  preview: string;
};

export type Post = {
  id: string;
  userId: string;
  time: string;
  caption: string;
  image?: string;
  video?: { src: string; poster?: string };
  likes: number;
  comments: { userId: string; text: string }[];
};

export type Reel = {
  id: string;
  userId: string;
  caption: string;
  poster: string;
  src: string;
  likes: number;
  comments: number;
};

const u = (seed: string) =>
  `https://i.pravatar.cc/200?img=${seed}`;

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const USERS: User[] = [
  { id: "u1", name: "Sarah Chen", bio: "Designer · ☕ + 🌿", avatar: u("12"), online: true },
  { id: "u2", name: "Marcus Reid", bio: "Photographer in Lisbon", avatar: u("13"), online: true },
  { id: "u3", name: "Aiko Tanaka", bio: "Swift dev · cat parent", avatar: u("32"), online: false },
  { id: "u4", name: "Diego Alvarez", bio: "Trail runner & chef", avatar: u("15"), online: true },
  { id: "u5", name: "Priya Shah", bio: "Product @ startup", avatar: u("16"), online: true },
  { id: "u6", name: "Liam O'Connor", bio: "Music producer", avatar: u("33"), online: false },
  { id: "u7", name: "Noor Hassan", bio: "Architect · sketcher", avatar: u("47"), online: true },
  { id: "u8", name: "Zoe Williams", bio: "Travel blogger ✈️", avatar: u("23"), online: false },
];

export const ME: User = {
  id: "me",
  name: "Alex Morgan",
  bio: "Welcome to my profile",
  avatar: u("8"),
  online: true,
};

export const STORIES: Story[] = USERS.slice(0, 6).map((user, i) => ({
  id: `s${i}`,
  userId: user.id,
  preview: img(`story-${user.id}`, 400, 700),
}));

export const POSTS: Post[] = [
  {
    id: "p1",
    userId: "u1",
    time: "2h",
    caption: "Slow Sunday in the studio. New brand identity coming together ✨",
    image: img("post-studio", 1200, 800),
    likes: 128,
    comments: [
      { userId: "u2", text: "This is gorgeous!" },
      { userId: "u4", text: "Love the palette 🔥" },
    ],
  },
  {
    id: "p2",
    userId: "u4",
    time: "5h",
    caption: "Trail run this morning — 18km and the view was worth every step.",
    image: img("post-trail", 1200, 900),
    likes: 312,
    comments: [{ userId: "u7", text: "Beast mode 💪" }],
  },
  {
    id: "p3",
    userId: "u5",
    time: "9h",
    caption: "Caught the city waking up today 🌆",
    video: {
      src: "https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4",
      poster: img("post-city", 1200, 700),
    },
    likes: 412,
    comments: [{ userId: "u1", text: "Cinematic ✨" }],
  },
  {
    id: "p4",
    userId: "u2",
    time: "1d",
    caption: "Golden hour over the Tagus 🌅",
    image: img("post-lisbon", 1200, 800),
    likes: 540,
    comments: [
      { userId: "u8", text: "Take me there!" },
      { userId: "u1", text: "Frame worthy." },
    ],
  },
];

// Public sample videos (Pexels — vertical-friendly, free to use)
export const REELS: Reel[] = [
  {
    id: "r1",
    userId: "u8",
    caption: "Tokyo neon walk 🌃",
    poster: "https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&w=600",
    src: "https://videos.pexels.com/video-files/3045163/3045163-uhd_1440_2560_30fps.mp4",
    likes: 2200,
    comments: 184,
  },
  {
    id: "r2",
    userId: "u4",
    caption: "Pasta from scratch 🍝",
    poster: "https://images.pexels.com/videos/4252090/pexels-photo-4252090.jpeg?auto=compress&cs=tinysrgb&w=600",
    src: "https://videos.pexels.com/video-files/4252090/4252090-uhd_1440_2732_25fps.mp4",
    likes: 1540,
    comments: 92,
  },
  {
    id: "r3",
    userId: "u6",
    caption: "Studio session vibes 🎧",
    poster: "https://images.pexels.com/videos/7095/woman-girl-headphones-music.jpg?auto=compress&cs=tinysrgb&w=600",
    src: "https://videos.pexels.com/video-files/4778621/4778621-hd_1080_1920_30fps.mp4",
    likes: 980,
    comments: 41,
  },
  {
    id: "r4",
    userId: "u7",
    caption: "Sketching Barcelona ✏️",
    poster: "https://images.pexels.com/videos/4625747/pexels-photo-4625747.jpeg?auto=compress&cs=tinysrgb&w=600",
    src: "https://videos.pexels.com/video-files/4625747/4625747-uhd_1440_2732_25fps.mp4",
    likes: 1320,
    comments: 63,
  },
];

export const findUser = (id: string) =>
  id === "me" ? ME : USERS.find((u) => u.id === id) ?? USERS[0];
