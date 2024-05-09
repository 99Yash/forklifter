import { Marquee } from '@/components/ui/marquee';
import {
  SiAmazonaws,
  SiAngular,
  SiBun,
  SiCss3,
  SiDeno,
  SiDigitalocean,
  SiDjango,
  SiDocker,
  SiDrizzle,
  SiEslint,
  SiExpress,
  SiFastify,
  SiFigma,
  SiFirebase,
  SiFlask,
  SiFramer,
  SiGatsby,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxtdotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiSpring,
  SiSqlite,
  SiSvelte,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiWebrtc,
} from '@icons-pack/react-simple-icons';

import * as Icons from '@/components/ui/icons';

const StacksCard = () => {
  return (
    <div className="flex h-60 flex-col gap-2 overflow-hidden rounded-xl p-4 shadow-feature-card-dark lg:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.Layers className="h-[18px] w-[18px]" />
          <h2 className="text-sm font-title">Stacks</h2>
        </div>
        <p className="text-xs text-slate-400">Hover for tooltip</p>
      </div>
      <Marquee
        gap="20px"
        className="py-4 mt-4 cursor-pointer"
        fade
        pauseOnHover
      >
        <SiHtml5 className="h-7 w-7 opacity-70" />
        <SiCss3 className="h-7 w-7 opacity-70" />
        <SiJavascript className="h-7 w-7 opacity-70" />
        <SiTypescript className="h-7 w-7 opacity-70" />
        <SiFigma className="h-7 w-7 opacity-70" />
        <SiNestjs className="h-7 w-7 opacity-70" />
        <SiFramer className="h-7 w-7 opacity-70" />
        <SiTailwindcss className="h-7 w-7 opacity-70" />
        <SiRedis className="h-7 w-7 opacity-70" />
        <SiNextdotjs className="h-7 w-7 opacity-70" />
        <SiReact className="h-7 w-7 opacity-70" />
        <SiPython className="h-7 w-7 opacity-70" />
        <SiFastify className="h-7 w-7 opacity-70" />
        <SiPostgresql className="h-7 w-7 opacity-70" />
        <SiMongodb className="h-7 w-7 opacity-70" />
        <SiAmazonaws className="h-7 w-7 opacity-70" />
        <SiGraphql className="h-7 w-7 opacity-70" />
        <SiDigitalocean className="h-7 w-7 opacity-70" />
        <SiEslint className="h-7 w-7 opacity-70" />
        <SiLaravel className="h-7 w-7 opacity-70" />
        <SiWebrtc className="h-7 w-7 opacity-70" />
      </Marquee>
      <Marquee
        gap="20px"
        className="py-4 cursor-pointer"
        reverse
        fade
        pauseOnHover
      >
        <SiBun className="h-7 w-7 opacity-70" />
        <SiDeno className="h-7 w-7 opacity-70" />
        <SiNuxtdotjs className="h-7 w-7 opacity-70" />
        <SiSpring className="h-7 w-7 opacity-70" />
        <SiFlask className="h-7 w-7 opacity-70" />
        <SiDjango className="h-7 w-7 opacity-70" />
        <SiExpress className="h-7 w-7 opacity-70" />
        <SiSvelte className="h-7 w-7 opacity-70" />
        <SiAngular className="h-7 w-7 opacity-70" />
        <SiVuedotjs className="h-7 w-7 opacity-70" />
        <SiPrisma className="h-7 w-7 opacity-70" />
        <SiMysql className="h-7 w-7 opacity-70" />
        <SiFirebase className="h-7 w-7 opacity-70" />
        <SiVite className="h-7 w-7 opacity-70" />
        <SiNodedotjs className="h-7 w-7 opacity-70" />
        <SiDocker className="h-7 w-7 opacity-70" />
        <SiKubernetes className="h-7 w-7 opacity-70" />
        <SiTrpc className="h-7 w-7 opacity-70" />
        <SiGo className="h-7 w-7 opacity-70" />
        <SiRust className="h-7 w-7 opacity-70" />
        <SiDrizzle className="h-7 w-7 opacity-70" />
        <SiSqlite className="h-7 w-7 opacity-70" />
        <SiGatsby className="h-7 w-7 opacity-70" />
      </Marquee>
    </div>
  );
};

export default StacksCard;
