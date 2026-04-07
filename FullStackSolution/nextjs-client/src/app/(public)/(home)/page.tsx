

import { Tweet } from "./Tweet";
import { TWEETS } from "@/app/shared/data/tweet.data";
import { TweetForm } from "./TweetForm";
export default function Home() {
    return (
        <div className="min-h-screen flex justify-center px-4 py-8 bg-gray-50">
            <div className="w-full max-w-xl">
                <h1 className="text-3xl font-bold mb-6">Home</h1>

                <TweetForm />

                <div className="space-y-6 mt-6">
                    {TWEETS.map((tweet) => (
                        <Tweet key={tweet.id} tweet={tweet} />
                    ))}
                </div>
            </div>
        </div>
    );
}


{/* <header className="border-b border-black/10 px-6 py-4
                           flex items-center justify-between bg-yellow">
             
              <Link href="/"
                  className="flex items-center gap-3">
                  <Image src="./globe.svg"
                      alt="X-Logo"
                      width={28}
                      height={28}
                      priority />
              </Link>

             

          </header>}
      </div>
  );
}*/}
