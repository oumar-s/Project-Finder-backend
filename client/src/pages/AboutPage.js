import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function AboutPage() {

    return (
        <div className='font-mono-sans'>
            <Navbar displayLogout={false} />
            <div className='flex flex-col gap-8 w-11/12 mx-auto mt-16'>
                <div>
                    <h1 className="text-5xl font-semibold mb-8">
                        About us
                    </h1>
                    <p>
                        Synergy is your go-to platform for fostering collaboration and open-source contribution within the developer community. We believe that by bringing together individuals with diverse skills and perspectives, create innovative solutions and drive meaningful change.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl mb-4 font-semibold">Our mission</h2>

                    <p>
                        Synergy is on a mission to facilitate seamless collaboration and open-source contribution among developers worldwide. We strive to create a vibrant ecosystem where individuals can connect, collaborate, and contribute to projects that inspire them and make a positive impact.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl mb-4 font-semibold">Our values</h2>
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                        <div>
                            <h3 className="text-l mb-2">
                                Collaboration
                            </h3>
                            <p>
                                We believe that working together is better than working alone. We foster a culture of collaboration, both within our team and with our users. We encourage open communication, feedback, and support among our community.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-l mb-2">
                                Contribution
                            </h3>
                            <p>
                                We believe that everyone has something to offer and something to learn. We empower our users to contribute to projects that interest them, challenge them, and inspire them. We also contribute to the open-source movement and the greater good of society.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-l mb-2" >
                                Innovation
                            </h3>
                            <p>
                                We believe that innovation is the key to creating amazing things. We embrace new ideas, technologies, and methods. We constantly seek to improve our platform, our projects, and ourselves.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-l mb-2">
                                Community
                            </h3>
                            <p>
                                We believe that community is the heart and soul of our platform. We prioritize building a strong and inclusive community where developers from all backgrounds feel welcomed, valued, and respected.

                            </p>
                        </div>
                        <div>
                            <h3 className="text-l mb-2">
                                Impact
                            </h3>
                            <p>
                                We believe that impact is the ultimate goal of our platform. We aim to create positive and meaningful impact through our projects, both for our users and for the world. We measure our success by the impact we make and the value we create.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h2 className="text-xl mb-2 font-semibold">Meet the founder</h2>

                    <p>
                        Hi! I'm Oumar, the founder of Synergy. I'm a passionate developers who loves to work on exciting and meaningful projects.
                    </p>

                    <p>
                        I realized that there are many developers like me who want to collaborate and contribute to projects that inspire them, but they don’t have an easy way to find and join them. That’s why I created Synergy, the ultimate platform for project collaboration and contribution.
                    </p>

                    <p>
                        I I'm also committed to supporting the open-source movement and the greater good of society. I believe that open-source projects are a powerful way to share knowledge, innovation, and creativity. I also believe that contributing to open-source projects is a great way to learn, grow, and build your portfolio as a developer.
                    </p>

                    <p>
                        I am always looking for feedback, suggestions, and ideas from our community. If you have any questions, comments, or concerns, please feel free to contact me. I would love to hear from you.
                    </p>

                    <p>
                        Thank you for choosing Synergy. We hope you enjoy using our platform and finding awesome projects to work on. 😊
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}