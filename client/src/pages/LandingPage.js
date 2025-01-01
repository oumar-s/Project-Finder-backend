import Navbar from "../components/navbar";
import Footer from "../components/footer";

import { Link } from "react-router-dom";

import imageOpen from "../assets/images/opensource.png";
import imageClosed from "../assets/images/closedsource.png";

import {
	Users,
	Code2,
	Library,
	Box,
	GitFork,
	Brain,
	Users2,
	MessageSquare,
	ArrowRight
} from 'lucide-react';

const HeroPattern = ({ title, description, imageSide = 'right', imageUrl }) => (
	<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
	  <div className={`space-y-6 ${imageSide === 'left' ? 'lg:order-2 lg:pl-12' : 'lg:pr-12'}`}>
		<h3 className="text-2xl font-bold text-gray-900">{title}</h3>
		<p className="text-lg text-gray-600 leading-relaxed">{description}</p>
	  </div>
	  <div className={`rounded-xl overflow-hidden ${imageSide === 'left' ? 'lg:order-1' : 'lg:order-2'}`}>
		<img 
		  src={imageUrl || "https://www.claudeusercontent.com/api/placeholder/800/600"}
		  alt={title} 
		  className="w-full h-full object-cover"
		/>
	  </div>
	</div>
  );

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:-translate-y-1 transition-all duration-300">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-500" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => (
	
  <div className="min-h-screen bg-gray-50 font-mono-sans">
	<Navbar page="Home" displayLogout={false} />
    {/* Hero Section */}
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build together with <span className="text-blue-500">Synergy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
		  	The hub for developer collaborator
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              className="inline-flex items-center px-6 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
              to="/sign-up"
              >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              className="inline-flex items-center px-6 py-3 rounded-md border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              to="/teams"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Build Your Dream Team Section */}
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Build your dream team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
		  Find team members for your project: Fuel your project's success by bringing in the right talent. Whether it's an open-source initiative or a closed-source project, our platform simplifies the search for dedicated collaborators.
          </p>
        </div>

        <div className="space-y-24">
          <HeroPattern
            title="Open-source"
            description="Empower your project with a diverse community of contributors. Find like-minded individuals passionate about making a difference in the open-source world."
            imageSide="right"
			imageUrl={imageOpen}
          />
          
          <HeroPattern
            title="Closed-source"
            description="Transform your closed-source project into a team effort. Connect with individuals who share your vision and bring unique skills to the table, turning your passion into a collaborative success."
            imageSide="left"
			imageUrl={imageClosed}
          />
        </div>
      </div>
    </section>

    {/* Discover Projects Section */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover exciting projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
			Embark on a journey of growth and impact by joining a team and contributing to projects that align with your skills and interests. Whether you seek open-source opportunities, want to hone your skills, engage in collaborative projects, or enhance your communication abilities, our platform is your gateway to meaningful contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <FeatureCard
            icon={GitFork}
            title="Open-source Contribution"
            description="Ready to give back to the community? Contribute to impactful open-source projects and be part of a global community that values collaboration, transparency, and the shared goal of advancing technology for everyone."
          />
          <FeatureCard
            icon={Brain}
            title="Skill Building"
            description="Level up your skills by contributing to real-world projects that challenge and inspire you. From coding to project management, our platform offers a variety of opportunities to enhance your portfolio."
          />
          <FeatureCard
            icon={Users2}
            title="Collaboration"
            description="Experience the power of collaboration by joining projects where teamwork is the key to success. Enhance your problem-solving abilities and learn from diverse perspectives."
          />
          <FeatureCard
            icon={MessageSquare}
            title="Communication"
            description="Improve your communication skills by engaging with project teams and collaborating effectively. From discussing ideas to resolving conflicts, our platform fosters an environment where communication is valued."
          />
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="bg-blue-500 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
		  Join Our Community of Collaborators and Contributors
          </h2>
          <p className="text-xl mb-8 text-blue-100">
		  Synergy is more than just a platform—it’s a vibrant community where developers come together to create, learn, and grow. Sign up today and start building something amazing.
          </p>
          <Link className="inline-flex items-center px-6 py-3 rounded-md bg-white text-blue-500 font-medium hover:bg-blue-50 transition-colors"
            to="/sign-up">
		  Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default LandingPage;