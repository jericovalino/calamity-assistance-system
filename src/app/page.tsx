import Link from 'next/link';
import Image from 'next/image';

import { Backgrounds } from '@/assets/images';
import { Card } from '@/components/containers';
import { Button } from '@/components/input_controls';
import { Badge, DSWDLogo, TownLogo } from '@/components/informationals';

const Home = () => {
  return (
    <div
      className="h-screen overflow-x-hidden overflow-y-scroll bg-gray-500"
      style={{
        perspective: '10px',
      }}
    >
      <section className="relative w-full sm:h-screen sm:[transform:_translateZ(-10px)_scale(2)]">
        <Image
          alt=""
          src={Backgrounds.building}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative isolate z-10">
          <header className="top-0 z-10 flex items-center bg-gradient-to-r from-white/70 via-blue-500/50 to-transparent p-2">
            <div className="flex items-center space-x-2">
              <TownLogo className="w-16" />
            </div>
            <h1 className="ml-4 text-2xl font-semibold leading-7">
              Calamity Assistance <br /> Request and Monitoring System
            </h1>
          </header>
          <main>
            <div className="container mx-auto mt-20">
              <h1 className="text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Campaigns
              </h1>

              <div className="relative mt-10">
                {/* <Button
                  style="icon"
                  icon={FaCircleArrowLeft}
                  size="large"
                  theme="primary"
                  className="absolute -left-4 top-1/2 -translate-x-full -translate-y-1/2"
                />
                <Button
                  style="icon"
                  icon={FaCircleArrowRight}
                  size="large"
                  theme="primary"
                  className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full"
                /> */}
                <div className="grid gap-4 p-4 sm:grid-cols-3">
                  <Card
                    title="Para sa Bagyong Aghon"
                    description="Layong matulungan ang mga San Luisenyong naapektuhan ng bagyang Aghon"
                    actionElements={[
                      <Link href="/campaigns/123">
                        <Button theme="primary">Submit a Request</Button>
                      </Link>,
                    ]}
                  >
                    <Badge
                      indicatorType="solidDot"
                      indicatorTheme="primary"
                      label="10 applications"
                    />
                    <img
                      alt=""
                      className="mt-1 h-64 w-full rounded border object-cover brightness-75"
                      src="https://images.unsplash.com/photo-1641648543489-0f0ce87bea80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHR5cGhvb24lMjBzaGVsdGVyfGVufDB8fDB8fHww"
                    />
                  </Card>
                  <Card
                    title="Tulong para maka-bangon"
                    description="Layong matulungan ang mga San Luisenyong naapektuhan ng bagyang Aghon"
                    actionElements={[
                      <Link href="/campaigns/123">
                        <Button theme="primary">Submit a Request</Button>
                      </Link>,
                    ]}
                  >
                    <Badge
                      indicatorType="solidDot"
                      indicatorTheme="primary"
                      label="10 applications"
                    />
                    <img
                      alt=""
                      className="mt-1 h-64 w-full rounded border object-cover opacity-75"
                      src="https://images.unsplash.com/photo-1584592487914-a29c64f25887?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                  </Card>
                  <Card
                    title="African Swine Fever(ASF)"
                    description="Layong matulungan ang mga San Luisenyong naapektuhan ng bagyang Aghon"
                    actionElements={[
                      <Link href="/campaigns/123">
                        <Button theme="primary">Submit a Request</Button>
                      </Link>,
                    ]}
                  >
                    <Badge
                      indicatorType="solidDot"
                      indicatorTheme="primary"
                      label="10 applications"
                    />
                    <img
                      alt=""
                      className="mt-1 h-64 w-full rounded border object-cover opacity-75"
                      src="https://plus.unsplash.com/premium_photo-1661963984016-a541beeb3e0c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGlnfGVufDB8fDB8fHww"
                    />
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
      <section className="relative isolate grid h-screen w-full place-items-center overflow-hidden bg-slate-200 py-12 sm:rounded-t-full md:py-24 lg:py-32">
        <TownLogo className="absolute inset-0 -z-10 w-full opacity-15" />
        <div className="">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">About</h2>
              <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We are a team of passionate designers and developers who are
                dedicated to creating beautiful and functional digital
                experiences. Our mission is to help businesses and individuals
                achieve their goals through innovative technology solutions.
              </p>
            </div>
            <div className="bg-primary flex items-center justify-center rounded-full p-6">
              <DSWDLogo className="h-12" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
