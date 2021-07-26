package com.osds.bitz.repository.account.user;

import com.osds.bitz.model.account.user.Skill;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, String> {
}
