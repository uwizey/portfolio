/* data.js: all your content. Edit the lists, save, refresh. Keep the commas and quotes. */

const PORTFOLIO = {

  /* Address that receives the contact form messages */
  email: "uwizeyimanafidel53@gmail.com",

  /* Hero: words that slide in the role line */
  roles: [
    "WebApp Developer",
    "Agile Scrum Project Manager",
    "Database Builder and Designer",
    "Web Inspector"
  ],

  /* Social icons. icon: instagram, facebook, email, github, linkedin, x, whatsapp */
  socials: [
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/c.a.s___t.r.o/" },
    { name: "GitHub",    icon: "github",    url: "https://github.com/uwizey" },
    { name: "Email",     icon: "email",     url: "mailto:uwizeyimanafidel53@gmail.com" }
    // { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/in/your-name" },
  ],

  /* About counters */
  stats: [
    { value: 2, label: "Projects done" },
    { value: 6, label: "Services offered" },
    { value: 2, label: "Years coding" }
  ],

  /* Skill cards. level = 0 to 100 */
  skillGroups: [
    {
      title: "Web",
      items: [
        { name: "HTML & CSS",        level: 90 },
        { name: "JavaScript",        level: 75 },
        { name: "Responsive design", level: 85 },
        { name: "Django", level: 70 }
      ]
    },
    {
      title: "Programming",
      items: [
        { name: "Python",          level: 70 },
        { name: "C# / C++",         level: 65 },
        { name: "SQL & databases", level: 70 }
      ]
    }
  ],

  /* Pills under the skill cards */
  tags: ["Git", "GitHub", "VS Code", "Figma","Office 356", "Teaching what I know", "Problem solving"],

  /* Projects. image, description and link are optional. Filter buttons come from the categories. */
  projects: [
    {
      title: "School website",
      category: "Web development",
      image: "images/school.png",
      description: "Official website for the school community.",
      link: "https://gsobindatwa.com/"
    },
    {
      title: "A blog showcasing amazing Rwanda",
      category: "Web development",
      image: "images/look.png",
      description: "A travel blog about places to visit in Rwanda.",
      link: "https://uwizey.github.io/Visit-Rwanda/"
    }
  ]
};
