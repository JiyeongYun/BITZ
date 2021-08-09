package com.osds.bitz.repository.account.user;


import com.osds.bitz.model.entity.account.user.Skill;
import com.osds.bitz.model.entity.account.user.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    Skill getSkillByUserAuth(UserAuth userAuth);
    Skill getSkillById(Long id);
}
