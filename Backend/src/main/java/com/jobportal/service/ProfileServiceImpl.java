package com.jobportal.service;

import com.jobportal.dto.AccountType;
import com.jobportal.dto.ProfileDTO;
import com.jobportal.entity.Profile;
import com.jobportal.exception.JobPortalExpection;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private Utilities utilities;

    @Override
    public Long createProfile(String name, String email, AccountType accountType) throws JobPortalExpection {
        try {
            Profile profile = new Profile();
            profile.setId(utilities.getNextSequence("profiles")); // Call as instance method
            profile.setName(name);
            profile.setEmail(email);
            profile.setAccountType(accountType);
            profile.setSkills(new ArrayList<>());
            profile.setExperiences(new ArrayList<>());
            profile.setCertifications(new ArrayList<>());
            profileRepository.save(profile);
            return profile.getId();
        } catch (Exception e) {
            throw new JobPortalExpection("Error creating profile: " );
        }
    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalExpection {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new JobPortalExpection("PROFILE_NOT_FOUND"));
        return profile.toDTO();
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalExpection {
        profileRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new JobPortalExpection("PROFILE_NOT_FOUND"));

        profileRepository.save(profileDTO.toEntity());
        return profileDTO;

    }

    @Override
    public List<ProfileDTO> getAllProfiles() {
        return profileRepository.findAll().stream().map((profile) -> profile.toDTO()).toList();
    }
}
