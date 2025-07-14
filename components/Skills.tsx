'use client'

import { motion } from 'framer-motion'
import { Code, Database, Cloud, Cpu, Smartphone, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getEndpointUrl } from '@/lib/config'

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

interface SkillCategory {
  _id: string;
  category: string;
  skills: Skill[];
  order: number;
  isActive: boolean;
}

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [additionalTechnologies, setAdditionalTechnologies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
    fetchAdditionalTechnologies();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(getEndpointUrl('skills'));
      if (response.ok) {
        const data = await response.json();
        // Filter only active categories and sort by order
        const activeCategories = data.data
          .filter((cat: SkillCategory) => cat.isActive)
          .sort((a: SkillCategory, b: SkillCategory) => a.order - b.order);
        setSkillCategories(activeCategories);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdditionalTechnologies = async () => {
    try {
      const response = await fetch(`${getEndpointUrl('skills')}/additional-technologies`);
      if (response.ok) {
        const data = await response.json();
        setAdditionalTechnologies(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching additional technologies:', error);
    }
  };

  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: any } = {
      'Frontend Development': Code,
      'Backend Development': Database,
      'DevOps & Tools': Cloud,
      'Mobile Development': Smartphone,
      'Design & UI/UX': Globe,
      'Data Science': Cpu,
    };
    return iconMap[categoryName] || Code;
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels.
          </p>
        </motion.div>

        {skillCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No skills available yet.</p>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const CategoryIcon = getCategoryIcon(category.category);
              return (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-effect p-6 rounded-xl"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <CategoryIcon className="w-8 h-8 text-primary-500" />
                    <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium flex items-center gap-2">
                            {skill.icon && <span>{skill.icon}</span>}
                            {skill.name}
                          </span>
                          <span className="text-primary-400 text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Additional Skills */}
        {additionalTechnologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-white text-center mb-8">
              Additional Technologies & Tools
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {additionalTechnologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="glass-effect p-4 rounded-lg text-center card-hover"
                >
                  <span className="text-gray-300 text-sm font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Skills; 