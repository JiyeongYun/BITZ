package com.osds.bitz.controller.account.user;


import com.osds.bitz.model.network.request.UpdatePasswordRequest;
import com.osds.bitz.model.network.response.BusinessAuthResponse;
import com.osds.bitz.service.account.business.BusinessAuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/accountbusiness")
@Api("Account 컨트롤러 API V1")
@Slf4j
public class BusinessAuthController {

    private BusinessAuthService businessAuthService;

    @PutMapping("/updatepassword")
    @ApiOperation(value="비밀번호 변경하기", notes="회원의 비밀번호를 DB에서 수정합니다.")
    public ResponseEntity<BusinessAuthResponse> updatePassword(@RequestBody @ApiParam(value="회원 정보") UpdatePasswordRequest updatePasswordRequest) throws Exception{
        BusinessAuthResponse response = new BusinessAuthResponse(businessAuthService.updatePassword(updatePasswordRequest));
        return new ResponseEntity<BusinessAuthResponse>(response, HttpStatus.OK);
    }
}
