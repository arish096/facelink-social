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
    caption: "Shipped a new feature today. Small win, big smile 🚀",
    likes: 84,
    comments: [],
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

// Public sample videos (Google sample bucket — vertical-friendly)
export const REELS: Reel[] = [
  {
    id: "r1",
    userId: "u8",
    caption: "Tokyo neon walk 🌃",
    poster: img("reel-tokyo", 600, 1000),
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: 2200,
    comments: 184,
  },
  {
    id: "r2",
    userId: "u4",
    caption: "Pasta from scratch 🍝",
    poster: img("reel-pasta", 600, 1000),
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    likes: 1540,
    comments: 92,
  },
  {
    id: "r3",
    userId: "u6",
    caption: "Studio session vibes 🎧",
    poster: img("reel-music", 600, 1000),
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    likes: 980,
    comments: 41,
  },
  {
    id: "r4",
    userId: "u7",
    caption: "Sketching Barcelona ✏️",
    poster: img("reel-sketch", 600, 1000),
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    likes: 1320,
    comments: 63,
  },
];

export const findUser = (id: string) =>
  id === "me" ? ME : USERS.find((u) => u.id === id) ?? USERS[0];
