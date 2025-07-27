package com.jobportal.dto;

import com.jobportal.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private AccountType accountType;
    private String picture;
    private Long totalExperience;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;
    private List<Long> savedJobs;


    public Profile toEntity() {
        return new Profile(
                this.id,
                this.name,
                this.email,
                this.jobTitle,
                this.company,
                this.location,
                this.about,
                this.accountType,
                this.picture != null ? Base64.getDecoder().decode(this.picture) : null,
                this.totalExperience,
                this.skills,
                this.experiences,
                this.certifications,
                this.savedJobs
        );
    }
}
