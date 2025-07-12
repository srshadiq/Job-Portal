package com.jobportal.service;

import com.jobportal.dto.AccountType;
import com.jobportal.dto.ProfileDTO;
import com.jobportal.exception.JobPortalExpection;

import java.util.List;

public interface ProfileService {
    public Long createProfile(String name, String email, AccountType accountType) throws JobPortalExpection;
    public ProfileDTO getProfile(Long id) throws JobPortalExpection;
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalExpection;

    public List<ProfileDTO> getAllProfiles() throws JobPortalExpection;
}
