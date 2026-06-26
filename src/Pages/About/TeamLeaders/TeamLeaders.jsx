import React, { useState, useRef, useEffect } from "react";
import Title from "@/components/Title/Title";

const TeamLeaders = ({ profiles = [] }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const modalContentRef = useRef(null);

  // Handle modal overflow scrolling
  useEffect(() => {
    if (selectedProfile && modalContentRef.current) {
      const modalContent = modalContentRef.current;
      if (modalContent.scrollHeight > modalContent.clientHeight) {
        modalContent.classList.add("overflow-y-auto");
        modalContent.classList.remove("overflow-hidden");
      }
    }
  }, [selectedProfile]);

  const parseSkills = (skills) => {
    if (!skills) return ["Leadership"];
    if (Array.isArray(skills)) {
      return skills.flatMap(skill => 
        typeof skill === 'string' ? skill.split(',').map(s => s.trim()) : skill
      );
    }
    return skills.split(',').map(skill => skill.trim());
  };

  const formatBio = (bio) => {
    if (!bio) return "No detailed biography provided.";
    
    const cleanBio = bio
      .replace(/<p>/g, '<p class="mb-4 last:mb-0">')
      .replace(/<strong>/g, '<strong class="font-semibold">')
      .replace(/<a[^>]*>/g, '<a class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">')
      .replace(/<br\s*\/?>/g, '<br class="my-2">');
    
    return cleanBio;
  };

  return (
    <section className="py-16 bg-background">
      {/* GLOBAL STRUCTURE WRAPPER ALIGNMENT */}
      <div className="container md:container lg:container mx-auto md:mx-auto lg:mx-auto px-6 md:px-8 lg:px-12">
        
        <div className="mb-12 md:mb-16 text-center">
          <Title name="MY Leadership" />
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Meet the experienced professionals driving innovation and excellence across our organization.
          </p>
        </div>

        {/* Grid Layout - Refined */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {profiles.map((profile, index) => {
            const displayName = profile?.name || "Team Member";
            const skills = parseSkills(profile.skills).slice(0, 2);
            
            return (
              <div
                key={profile?.id || index}
                onClick={() => setSelectedProfile(profile)}
                className="group cursor-pointer bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                  <img
                    src={profile.image || "/api/placeholder/400/500"}
                    alt={displayName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      View details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Text Section */}
                <div className="p-5 md:p-6 flex flex-col grow">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {profile?.department || "General"}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-medium mb-1">
                    {profile?.designation || "Professional"}
                  </p>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1">
                    {displayName}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4 grow content-start">
                    {skills.map((skill, idx) => (
                      <span 
                        key={`${skill}-${idx}`} 
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md whitespace-nowrap"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {profile?.years_in_company || '1'}+ years
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {profile?.employment_type?.toLowerCase() || 'Full-time'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProfile(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-5xl max-h-[85vh] sm:max-h-[90vh] bg-white dark:bg-gray-900 md:rounded-2xl rounded-md md:shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in duration-200">
            {/* Close Button Anchor */}
            <button 
              onClick={() => setSelectedProfile(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left: Image Side-panel (standardized size) */}
            <div className="w-full md:w-2/5 bg-gray-100 dark:bg-gray-800 shrink-0 flex items-center justify-center p-2">
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-[94%] md:h-80 lg:w-[94%] lg:h-96 overflow-hidden rounded-md bg-white flex items-center justify-center">
                <img
                  src={selectedProfile.image || "/api/placeholder/600/800"}
                  className="w-full h-full object-cover object-center"
                  alt={selectedProfile.name}
                />
              </div>
            </div>

            {/* Right: Content Engine */}
            <div 
              ref={modalContentRef}
              className="w-full md:w-3/5 flex flex-col overflow-y-auto custom-scrollbar"
            >
              <div className="p-5 sm:p-6 md:p-8">
                {/* Header Metadata */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full">
                      {selectedProfile.department || "General"}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {selectedProfile.years_in_company || '1'}+ years
                    </span>
                  </div>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm uppercase tracking-wider font-medium mb-1">
                    {selectedProfile.designation}
                  </p>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {selectedProfile.name || selectedProfile.user?.name}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm break-all">
                    {selectedProfile.email || selectedProfile.user?.email}
                  </p>
                </div>

                {/* Expertise Sub-section */}
                <div className="mb-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {parseSkills(selectedProfile.skills).map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Biography Box */}
                <div className="mb-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                    Biography
                  </h4>
                  <div 
                    className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: formatBio(selectedProfile.bio || selectedProfile.description) }}
                  />
                </div>

                {/* Contact & Professional Details */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Employment
                      </h5>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {selectedProfile.employment_type?.toLowerCase() || 'Full-time'}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Joined
                      </h5>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        {selectedProfile.joining_date 
                          ? new Date(selectedProfile.joining_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'Not specified'
                        }
                      </p>
                    </div>
                  </div>
                  
                  {/* Social Network Anchors */}
                  {(selectedProfile.linkedin_url || selectedProfile.github_url || selectedProfile.portfolio_url) && (
                    <div className="mt-6">
                      <h5 className="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Connect
                      </h5>
                      <div className="flex gap-3">
                        {selectedProfile.linkedin_url && (
                          <a 
                            href={selectedProfile.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {selectedProfile.github_url && (
                          <a 
                            href={selectedProfile.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {selectedProfile.portfolio_url && (
                          <a 
                            href={selectedProfile.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamLeaders;
