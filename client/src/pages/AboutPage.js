import Navbar from '../components/navbar';
import Footer from '../components/footer';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar displayLogout={false} />
      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About us
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Synergy is your go-to platform for fostering collaboration and open-source contribution within the developer community. 
            We believe that by bringing together individuals with diverse skills and perspectives, create innovative solutions and drive meaningful change.
          </p>
        </div>

        {/* Mission section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Synergy is on a mission to facilitate seamless collaboration and open-source contribution among developers worldwide. 
            We strive to create a vibrant ecosystem where individuals can connect, collaborate, and contribute to projects that inspire 
            them and make a positive impact.
          </p>
        </div>

        {/* Values section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Value cards */}
            {[
              {
                title: "Collaboration",
                content: "We believe that working together is better than working alone. We foster a culture of collaboration, both within our team and with our users. We encourage open communication, feedback, and support among our community."
              },
              {
                title: "Contribution",
                content: "We believe that everyone has something to offer and something to learn. We empower our users to contribute to projects that interest them, challenge them, and inspire them. We also contribute to the open-source movement and the greater good of society."
              },
              {
                title: "Innovation",
                content: "We believe that innovation is the key to creating amazing things. We embrace new ideas, technologies, and methods. We constantly seek to improve our platform, our projects, and ourselves."
              },
              {
                title: "Community",
                content: "We believe that community is the heart and soul of our platform. We prioritize building a strong and inclusive community where developers from all backgrounds feel welcomed, valued, and respected."
              },
              {
                title: "Impact",
                content: "We believe that impact is the ultimate goal of our platform. We aim to create positive and meaningful impact through our projects, both for our users and for the world. We measure our success by the impact we make and the value we create."
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet the founder</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Hi! I'm Oumar, the founder of Synergy. I'm a passionate developers who loves to work on exciting and meaningful projects.
            </p>
            <p>
              I realized that there are many developers like me who want to collaborate and contribute to projects that inspire them, 
              but they don't have an easy way to find and join them. That's why I created Synergy, the ultimate platform for project 
              collaboration and contribution.
            </p>
            <p>
              I'm also committed to supporting the open-source movement and the greater good of society. I believe that open-source 
              projects are a powerful way to share knowledge, innovation, and creativity. I also believe that contributing to open-source 
              projects is a great way to learn, grow, and build your portfolio as a developer.
            </p>
            <p>
              I am always looking for feedback, suggestions, and ideas from our community. If you have any questions, comments, or concerns, 
              please feel free to contact me. I would love to hear from you.
            </p>
            <p>
              Thank you for choosing Synergy. We hope you enjoy using our platform and finding awesome projects to work on. 😊
            </p>
          </div>
        </div>

      </div>
        <Footer />
    </div>
  );
}