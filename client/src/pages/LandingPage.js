import Navbar from "../components/navbar";
import Footer from "../components/footer";

import imageOpen from "../assets/images/image_3.png";
import imageClosed from "../assets/images/image_1.png";



export default function LandingPage() {
	return (
		
		<div className="font-mono-sans">
			<Navbar displayLogout={false} />
			<div className="w-11/12 mx-auto" >

				<div className="hero flex flex-col gap-2 justify-center items-center text-center h-screen" >
					<h1 className=" text-5xl md:text-8xl font-semibold" >
						Build together with synergy
					</h1>
				
					<p className=" text-xl md:text-2xl font-normal">
						The hub for developer collaborator
					</p>
					<div className="flex justify-center">
						<a href="/sign-up" style={{ textDecoration: "none" }}>
							{/* emerald-600 */}
							<button className="font-bold text-white py-4 px-8 bg-[#1571e3] border rounded-md">Sign up for Synergy </button>
						</a>
					</div>
				</div>


				<div class="">
					<div className="mb-16">
						<h2 className="text-center text-3xl md:text-5xl p-8 font-medium">
							Build your dream team
						</h2>
						<p className="">
							Find team members for your project: Fuel your project's success by bringing in the right talent. Whether it's an open-source initiative or a closed-source project, our platform simplifies the search for dedicated collaborators.
						</p>

						<div className="my-4">
							<div className="flex flex-col gap-4 my-8 p-4 md:flex-row items-center h-full">
								<div className="flex-1">
									<h3 className="text-xl md:text-2xl font-medium text-center mb-2">
										Open-source
									</h3>
									<p>
										Empower your project with a diverse community of contributors. Find like-minded individuals passionate about making a difference in the open-source world.
									</p>
								</div>
								<div className="flex-1  w-full">
									<img src={imageOpen} alt="open-source" className="object-fill w-full" />
								</div>
								
							</div>
							<div className="flex flex-col gap-4 my-8 p-4 md:flex-row-reverse items-center h-full">
								
								<div className="flex-1 ">
									<h3 className="text-xl md:text-2xl font-medium text-center mb-2">
										Closed-source
									</h3>
									<p>
										Transform your closed-source project into a team effort. Connect with individuals who share your vision and bring unique skills to the table, turning your passion into a collaborative success.

									</p>
								</div>
								<div className="flex-1 w-full">
									<img src={imageClosed} alt="open-source" className="object-fill w-full"/>
								</div>
								
							</div>
						</div>	
					</div>

					<div className="mb-16">
						<div className="flex flex-col gap-4 my-4">
							<div classname="">
								<h2 className="text-center text-3xl md:text-5xl p-8 font-medium">
									Find your dream team
								</h2>
								<p>
									Embark on a journey of growth and impact by joining a team and contributing to projects that align with your skills and interests. Whether you seek open-source opportunities, want to hone your skills, engage in collaborative projects, or enhance your communication abilities, our platform is your gateway to meaningful contributions.
								</p>
							</div>
								<div className="flex flex-col gap-8 my-4 md:grid md:grid-cols-2">
								<div>
									<h3 className="text-xl md:text-2xl font-medium mb-2">
										Open-source contribution
									</h3>
									<p>
										Ready to give back to the community? Contribute to impactful open-source projects and be part of a global community that values collaboration, transparency, and the shared goal of advancing technology for everyone.
									</p>
								</div>
								<div>
									<h3 className="text-xl md:text-2xl font-medium mb-2" >
										Skill building
									</h3>
									<p>
										Level up your skills by contributing to real-world projects that challenge and inspire you. From coding to project management, our platform offers a variety of opportunities to enhance your portfolio.
									</p>
								</div>
								<div>
									<h3 className="text-xl md:text-2xl font-medium mb-2">
										Collaboration
									</h3>
									<p>
										Experience the power of collaboration by joining projects where teamwork is the key to success. Enhance your problem-solving abilities and learn from diverse perspectives.

									</p>
								</div>
								<div>	
									<h3 className="text-xl md:text-2xl font-medium mb-2">
										Communication
									</h3>
									<p>
										Improve your communication skills by engaging with project teams and collaborating effectively. From discussing ideas to resolving conflicts, our platform fosters an environment where communication is valued.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 my-4">
						<h2 className="text-center text-xl md:text-2xl font-medium ">
							Join Our Community of Collaborators and Contributors
						</h2>

						<p>
							Synergy is more than just a platform—it’s a vibrant community where developers come together to create, learn, and grow. Sign up today and start building something amazing.
						</p>
						<div className="text-center">
							<a href="/sign-up" style={{ textDecoration: "none" }}>
								<button className="text-blue-600 font-bold">Sign up for Synergy!</button>
							</a>
							{/* <a href="/login" style={{ textDecoration: "none" }}>
								<button className=" ">Browse Projects.</button>
							</a> */}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}