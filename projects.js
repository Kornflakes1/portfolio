// Every project on the site. Edit text here and it updates on every page.
//   id:         a short name for the project (no spaces)
//   category:   "games", "modding" or "misc"
//   background: the picture on its card, or "" for none
//   classified: true to show the card picture heavily blurred with an "Unannounced" stamp
//   locked:     true to grey the card out and make it unclickable
//   title, tagline
//   cardTagline: optional short line shown under the name on the Home card (otherwise the tagline)
//   steam:      optional { label, url } Steam link with the Steam logo, shown at the end of the tagline
//   role, dates: your role and when, shown under the title (leave "" to hide)
//   text:       one entry per paragraph
//   results:    optional big numbers with a short label, shown as "Key results"
//   highlights: bullet points of what you did, shown as "Role"
//   links:      links shown under the title
//   servers:    optional live server list feed
//   cardFocus:  optional, which part of the picture the tall home card centres on, e.g. "46% center"
//   cardZoom:   optional, below 1 zooms the picture out on the home card so more of it fits, above 1 zooms in
//   cardFill:   optional colour behind a picture with see-through edges; the picture is shown whole
//   hoverCycle: optional, true to flick through the gallery pictures on the card while hovered
//   hoverVideo: optional muted clip that plays on the card while hovered
//   features:   optional bullet list shown as "Features"
//   credits:    optional groups of { role, name } shown as "Credits"
//   gallery:    pictures shown when the project is opened; a picture can be { src, label } to tag it, add video: true for a clip, youtube: id to open that video when clicked
//   bgVideo:    optional clip that plays once, faintly, behind the whole project view
const PROJECTS = [
  {
    id: "pe-redux",
    category: "modding",
    background: "images/pe-redux/card.png",
    cardFill: "#ffffff",
    title: "Pandemic Express Redux",
    tagline: "Modded Client, Community and Servers",
    cardTagline: "CryEngine 5.3",
    steam: { label: "Pandemic Express - Zombie Escape", url: "https://store.steampowered.com/app/939510/" },
    role: "Team Lead / Environment Designer · Radioboys",
    dates: "2024 - 2026 (Ongoing)",
    text: [
      "Redux is a community-made overhaul that brought Pandemic Express back to life years after official support ended. I led a small volunteer team shipping regular patches, new and reworked open-world locations, and major performance gains through a custom launcher.",
      "On the 21st of January 2026, Tinybuild announced they would be delisting the game from Steam, making it undiscoverable to new players. Redux is unaffected, and you can still play it without owning the game on Steam."
    ],
    results: [
      { number: "25+", label: "major patches in 6 months" },
      { number: "6", label: "international volunteer developers led" },
      { number: "1,500+", label: "community members" },
      { number: "Up to 400%", label: "better performance and stability" }
    ],
    highlights: [
      "Led a team of 6 in overhauling the game's core mechanics, balance and systems through regular updates",
      "Allocated tasks and planned milestones so the team shipped a major patch every week",
      "Used CryEngine 5.3's lighting, effects and particles to shape the maps' flow and atmosphere",
      "Reworked existing map areas within the established art style to improve visual composition and support the asymmetric gameplay",
      "Built new locations from the existing asset library, working within the limits of an older engine version",
      "Ran playtests and turned player feedback into balance, bug and layout fixes",
      "Organised community events to keep players engaged"
    ],
    servers: "https://peredux.duckdns.org/servers.json",
    links: [
      { label: "Website", url: "https://peredux.duckdns.org/" },
      { label: "GitHub", url: "https://github.com/Kornflakes1/PandemicExpressRedux" },
      { label: "YouTube", url: "https://www.youtube.com/@PE-Redux" },
      { label: "Discord", url: "https://discord.gg/J8287MJTay" }
    ],
    bgVideo: "images/pe-redux/radioboys.mp4",
    gallery: [
      { src: "images/pe-redux/roadmap.jpg", label: "Roadmap" },
      { src: "images/pe-redux/update-1-5.jpg", label: "Update" },
      { src: "images/pe-redux/infographic.jpg", label: "Infographic" }
    ]
  },
  {
    id: "one-more-round",
    category: "games",
    background: "images/final-call/key-art.png",
    cardFocus: "47% 46%",
    hoverVideo: "images/final-call/trailer-preview.mp4",
    title: "Final Call",
    tagline: "s&box",
    role: "",
    dates: "",
    text: [
      "\"Final Call\" is a hilarious first person physics based bar fight simulator.",
      "You're the lone sheriff in town, it's the last call for drinks at the bar and everybody is determined to stand between you and a cold bottle of hooch.",
      "Step into the shoes of the sheriff and hurl tables, chairs, bodies and punch your way through to the bar to get \"one more round.\"",
      "You'll slowly find out theres more to this saloon than meets the eye."
    ],
    features: [
      "Physics based fighting where you can pick up and throw anything and everyone!!!",
      "Punch, kick, block and dash",
      "Completely custom sound effects from the PSX era",
      "Sweet Doom inspired HUD and sprites.",
      "Fully voice acted characters",
      "A rage mode that lets you tear enemies apart",
      "A tutorial, three levels and a fully playable boss fight (I managed to get it out!!)"
    ],
    credits: [
      { title: "Credits", rows: [
        { role: "Game Design, Gameplay, Programming, Level Design", name: "Jasper" },
        { role: "Gameplay & Level Design", name: "Ethan H." },
        { role: "Gameplay and UI Design + Sprites", name: "Ethan B." },
        { role: "Sound Design", name: "Deanerdaweiner" },
        { role: "Key Art", name: "Goodman29" }
      ] },
      { title: "Voice Acting", rows: [
        { role: "Sheriff, Enemies", name: "Ethan H." },
        { role: "Bartender, Boss", name: "Kazuki, Jasper" }
      ] }
    ],
    highlights: [],
    links: [
      { label: "Play on s&box", url: "https://sbox.game/kornflakes/one_more_round" }
    ],
    gallery: [
      { src: "images/final-call/thumbnail.jpg", label: "Thumbnail" },
      { src: "images/final-call/trailer-preview.mp4", label: "Trailer", video: true, youtube: "mxjlMaIrxw8" },
      { src: "images/final-call/main-menu.mp4", label: "Main Menu", video: true },
      { src: "images/final-call/screenshots/church.png", label: "Screenshot" },
      { src: "images/final-call/screenshots/01.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/02.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/03.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/04.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/05.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/06.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/07.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/08.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/09.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/10.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/11.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/12.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/13.jpg", label: "Screenshot" },
      { src: "images/final-call/screenshots/14.jpg", label: "Screenshot" }
    ]
  },
  {
    id: "dayz",
    category: "modding",
    background: "images/project-flamingo/title.png",
    cardZoom: 0.7,
    hoverCycle: true,
    title: "Project Flamingo",
    tagline: "A DayZ Community Server",
    role: "Co-Lead / Level Designer",
    dates: "2022 - 2025",
    text: [],
    highlights: [
      "Co-led development of a custom server for a community of 100,000+ members",
      "Designed and built a 4km²+ open-world map in DayZ Terrain Builder",
      "3,000+ hours of self-taught DayZ modding, using legacy scripting and manual, destructive toolsets",
      "Iterated on terrain, object placement and world density from playtest data and player behaviour",
      "Built biomes, towns, landmarks and points of interest around player flow, encounters and environmental storytelling",
      "Co-wrote design documents to keep a consistent creative vision through development"
    ],
    links: [],
    gallery: [
      "images/project-flamingo/meadows-1.png",
      "images/project-flamingo/meadows-2.png",
      "images/project-flamingo/meadows-3.png",
      "images/project-flamingo/meadows-4.png",
      "images/project-flamingo/meadows-5.png",
      "images/project-flamingo/meadows-7.png",
      "images/project-flamingo/meadows-8.png",
      "images/project-flamingo/meadows-9.png",
      "images/project-flamingo/meadows-10.png"
    ]
  },
  {
    id: "pe2",
    category: "games",
    background: "images/unannounced/card.png",
    classified: true,
    locked: true,
    title: "Unannounced Project",
    tagline: "Unreal Engine 5",
    role: "",
    dates: "",
    text: [],
    highlights: [],
    links: [],
    gallery: ["images/unannounced/pe2.png"]
  }
];
