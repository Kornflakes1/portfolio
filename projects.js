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
//   gallery:    pictures shown when the project is opened (put them in images/gallery/)
const PROJECTS = [
  {
    id: "pe-redux",
    category: "modding",
    background: "images/PE Redux/1f394133-f88c-49fc-903d-3a0552bc0764.png",
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
    gallery: []
  },
  {
    id: "one-more-round",
    category: "games",
    background: "images/One More Round/key art.png",
    cardFocus: "47% 46%",
    hoverVideo: "images/One More Round/trailer-preview.mp4",
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
    gallery: []
  },
  {
    id: "dayz",
    category: "modding",
    background: "images/Project Flamingo Dayz/meadows title.png",
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
      "images/Project Flamingo Dayz/meadows pic1.png",
      "images/Project Flamingo Dayz/meadows pic2.png",
      "images/Project Flamingo Dayz/meadows pic3.png",
      "images/Project Flamingo Dayz/meadows pic4.png",
      "images/Project Flamingo Dayz/meadows pic5.png",
      "images/Project Flamingo Dayz/meadows pic7.png",
      "images/Project Flamingo Dayz/meadows pic8.png",
      "images/Project Flamingo Dayz/meadows pic9.png",
      "images/Project Flamingo Dayz/meadows pic10.png"
    ]
  },
  {
    id: "pe2",
    category: "games",
    background: "images/Unnanounced Project/genxsoftlcub.png",
    classified: true,
    locked: true,
    title: "Unannounced Project",
    tagline: "Unreal Engine 5",
    role: "",
    dates: "",
    text: [],
    highlights: [],
    links: [],
    gallery: ["images/gallery/pe2-blockout.png"]
  }
];
