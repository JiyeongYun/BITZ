package com.osds.bitz.model.network.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReviewRequest {

    private String email;

    private Long gameId;

    private String mvp;

    private String goodPeople[];

    private String badPeople[];

    private Long gymId;

    private int rate;

}
