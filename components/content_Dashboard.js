import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const ContentDashboard = ({ blok }) => (
  <div>
    <main
      {...storyblokEditable(blok)}
      className="grid grid-cols-1 sm:grid-cols-4 sm:gap-10 rounded-2xl"
    >
      {blok.content.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  </div>
);

export default ContentDashboard;
